class TermsController < ApplicationController

  def index

  	render
  	
  end


  def request_terms


  	if params[:search] and params[:search] != 'false'
  		@terms = AccessTerm.where("term_type = ? AND term_original LIKE ?", params[:type], "%#{params[:search]}%").paginate(:page => params[:page])
  	else
  		@terms = AccessTerm.where(:term_type => params[:type]).paginate(:page => params[:page])

  	end

  	if @terms
  		render :json => {"results" => @terms, "pages" => @terms.total_entries}.to_json
  	end

  end


  def request_entity

    results = []

    params[:ids].each do |id|

      nodes = []
      edges = []
      edge_count = 1;


      #add the base node.
      @org = AccessTerm.find(id)
      nodes << { "id" => 't' + id.to_s, "title" => @org['term_original'],  "type" => @org['term_type'], "primary" => true}
      


      lookup_com = []
      lookup_col = []

      #select all the collections and components assoiciated with this term
      terms = AccessTerm.joins(:access_term_associations).where("access_term_id = ?", id).select("access_term_associations.describable_id, access_term_associations.describable_type, access_terms.id, access_terms.term_type, access_terms.term_original")
      
      terms.each do |x|
        if x['describable_type'] == 'Component'
          new_term = "com" + x['describable_id'].to_s
          lookup_com << x['describable_id']
        else
          new_term = "col" + x['describable_id'].to_s
          lookup_col << x['describable_id']
        end

        #add the noooode
        nodes << { "id" => new_term, "type" => x['describable_type']}

        #there is a link from this com or col to the main node
        edges <<  { "id" => edge_count, "source" => 't' + id.to_s, "target" => new_term }
        edge_count = edge_count + 1
      end

      #now look up the details of the components
      components = Component.where(id: lookup_com).select('id,title,collection_id')
      components.each do |com|

        node = nodes.select {|f| f["id"] == 'com' + com['id'].to_s}
        puts node
        node[0][:title] = com['title'].to_s
        node[0][:collection] = com['collection_id'].to_s

        #add a link to its collection
        edges <<  { "id" => edge_count, "source" => 'com' + com['id'].to_s, "target" => 'col' + com['collection_id'].to_s }
        edge_count = edge_count + 1

        #does this collection exist in the results already?
        if !lookup_col.include? com['collection_id'].to_i
          #no add it
          nodes << { "id" => 'col' + com['collection_id'].to_s, "type" => 'Collection'}
          lookup_col << com['collection_id']
          #add a link to it
          edges <<  { "id" => edge_count, "source" => 'com' + com['id'].to_s, "target" => 'col' + com['collection_id'].to_s }
          edge_count = edge_count + 1
        end
      end

      #now look up the details of the colleections
      collections = Collection.where(id: lookup_col).select("id,title")
      collections.each do |col|
        node = nodes.select {|f| f["id"] == 'col' + col['id'].to_s}
        node[0][:title] = col['title'].to_s
        node[0][:collection] = col['id'].to_s
      end

      #now find all the terms connected to the components

      all_terms = AccessTerm.joins(:access_term_associations).where("access_term_associations.describable_type = 'Component'").where("access_term_associations.describable_id IN (?)", lookup_com).where('access_terms.term_type != "genreform"').select("access_term_associations.describable_id, access_terms.id, access_terms.term_type, access_terms.term_original").limit(100)
      all_terms.each do |x|
        nodes << { "id" => 't' + x['id'].to_s, "title" => x['term_original'],  "type" => x['term_type']}
        edges <<  { "id" => edge_count, "source" => 't' + x['id'].to_s, "target" => 'com' + x['describable_id'].to_s }
        edge_count = edge_count + 1
      end

      all_terms = AccessTerm.joins(:access_term_associations).where("access_term_associations.describable_type = 'Collection'").where("access_term_associations.describable_id IN (?)", lookup_col).where('access_terms.term_type != "genreform"').select("access_term_associations.describable_id, access_terms.id, access_terms.term_type, access_terms.term_original").limit(100)
      all_terms.each do |x|

        nodes << { "id" => 't' + x['id'].to_s, "title" => x['term_original'],  "type" => x['term_type']}
        edges <<  { "id" => edge_count, "source" => 't' + x['id'].to_s, "target" => 'col' + x['describable_id'].to_s }
        edge_count = edge_count + 1
      end


      results << {"nodes" => nodes, "edges" => edges}

      

    end

    render :json => results.to_json

  end

end
