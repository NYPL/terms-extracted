(function() {

	"use strict";


	window.Archives.termsVis = {


		searchIds : [],

		activeSearchIds : [],

		termsType: ['persname','corpname','title','topic'],

		termNames: {'persname' : "Person",
					'corpname' : "Org.",
					'title' : "Title",
					'topic' : "Topic",
					'subject' : 'Topic',
					'component' : "Component",
					'collection' : 'Collection'					
					},

		activeSearch : {},



		totalPages : 9999,

		perPage: 30,

		nodeIndex : {},
		edgesAdded: [],

		mouseX : 0,
		mouseY: 0,

		lockNodes : false,

		hoverTimer : null,

		template_search_table : '<table class="table table-striped table-hover"><tbody><%_.each(names, function(name) {%><tr data-id="<%=name.id%>" class="search-box-results-result<% if (_.indexOf(Archives.termsVis.searchIds,name.id) > -1){%> info<%}%>"><td><%=name.name%></td></tr><% }); %></tbody></table>',

		template_terms_hover : '<div class="terms-hover-type"><%=hover.type%></div><div class="terms-hover-title"><%=hover.title%></div><br><% if (hover.expand){%><a href="#" id="term-expand" class="btn btn-mini">Expand</a><%}%><% if (hover.record){%><a href="<%=hover.href%>" target="_blank" class="btn btn-mini">View in Finding Aid</a><%}%>',

		init : function(){
			var self = this;


			if (window.location.href.search('/terms') === -1 ) return false;





			var throttled = _.throttle(this.resize, 500);
			$(window).resize(throttled);



			$("#pagination-next").click(this.pageNext);
			$("#pagination-prev").click(this.pagePrev);

			$("#search-box-form").submit(this.searchSubmit);

			$(".add-tab").click(this.loadSearch);

			$("#search-box-add").click(function(){self.request_entity();});

			$("#search-box-close").click(function(){self.hideSearch(); self.searchIds=[];});

			$(window).resize();


			$(window).mousemove(function(e){
				self.mouseX = e.clientX;
				self.mouseY = e.clientY;
			});


			$("#terms-clear").click(function(){

				self.searchIds = [];
				self.activeSearchIds = [];
				self.activeSearch = {};
				self.nodeIndex = {};
				self.edgesAdded = [];
				self.networkNodes = [];
				self.networkLinks = [];
				self.networkForce.nodes(self.networkNodes);

				self.networkForce.links(self.networkLinks);
				self.networkRestart();
				d3.selectAll(".network-link, .node").remove();


				
			});

			this.initD3();

			


		},


		resize : function(){
			$(".main-content.terms-index").css("height",$(window).height()-($("#footer").height()*7.5));
			$(".main-content.terms-index svg").css("height",$(window).height()-($("#footer").height()*7.5));
		},


		showSearch: function(){


			$(".terms-add").css("left",-300);
			window.setTimeout(function(){$(".search-box").css("left",0);},500);

		},

		hideSearch: function(){
			$(".search-box").css("left",-400);
			
			window.setTimeout(function(){$(".terms-add").css("left",0);},500);

			$("#search-box-form input").val('');
			$('#search-box-total-add').text("");
			

		},
		showInfo: function(d){

			var self = this;

			$(".info-box h5").text(d.title);
			$(".info-box .type").text(this.termNames[d.type]);
			

			if (d.type == 'component' || d.type == 'collection'){

				$("#info-view").show();

				if (d.type == 'component'){
					$("#info-view").attr("href",'/collection/' + d.collectionId  + '/#c' + d.orgId);
				}else{
					$("#info-view").attr("href",'/collection/' + d.orgId);
				}


			}else{
				$("#info-view").hide();
			}

			$("#info-expand").unbind('click').click(function(e){


				self.request_entity(d.orgId);

				e.preventDefault();
				return false;

			});

			$(".info-box").css("width",400);



		},

		hideInfo: function(){
			$(".info-box").css("width",0);
	

		},
		loadSearch: function(e){
			var self = Archives.termsVis;
			self.request_terms($(this).data('type'));

			$(this).data('type');
			$("#search-box-label").text('Add ' + self.termNames[$(this).data('type')]);
			

			self.showSearch();
		},

		pageNext : function(e){

			var self = Archives.termsVis;

			if (!self.activeSearch.page){
				self.activeSearch.page = 1;
			}

			if (self.activeSearch.page + 1 <= self.totalPages){

				self.activeSearch.page++;
				self.request_terms(self.activeSearch.termType,self.activeSearch.search,self.activeSearch.page);

			}

			e.preventDefault();
			return false;



		},
		pagePrev : function(e){

			var self = Archives.termsVis;

			if (!self.activeSearch.page){
				self.activeSearch.page = 1;
			}

			if (self.activeSearch.page - 1 > 0){
				self.activeSearch.page--;
				self.request_terms(self.activeSearch.termType,self.activeSearch.search,self.activeSearch.page);
			}

			e.preventDefault();
			return false;

		},
		searchResultClick: function(){


			var id = parseInt($(this).data("id"));

			if ($(this).hasClass('info')){

				$(this).removeClass('info');

				if (_.indexOf(Archives.termsVis.searchIds,id) > -1){
					Archives.termsVis.searchIds.splice(_.indexOf(Archives.termsVis.searchIds,id),1);
				}

			}else{
				$(this).addClass('info');
				Archives.termsVis.searchIds.push(id);
			}

			if (Archives.termsVis.searchIds.length > 0){
				$('#search-box-total-add').text(" (" + Archives.termsVis.searchIds.length + ")");
			}else{
				$('#search-box-total-add').text("");
			}


		},

		searchSubmit : function(e){

			var self = Archives.termsVis;

			self.request_terms(self.activeSearch.termType,$(this).find("input").first().val());


			e.preventDefault();
			return false;
		},


		/*
		Make a request to the server to ask for terms, it can be any of the terms or search value to use and page # to use 
		*/
		request_terms: function(termType,search,page){

			var self = this;

			search = (typeof search == 'undefined') ? false : search;
			page = (typeof page == 'undefined') ? 1 : page;

			//make it the active search
			this.activeSearch = { termType:  termType, page:page, search:search };


			//$("#search-box-results table").first().html('<div style="text-align:center">Working...</div>');
			$(".search-box-results-result").css("opacity",0.25);

	        $.get( "/terms/request_terms", { type: termType, page: page, search: search} )
	            .done(function( data ) {


	            	self.totalPages = data.pages / self.perPage;

	            	if (data.pages % self.perPage !== 0){
	            		self.totalPages = parseInt(self.totalPages) + 1;
	            	}

	            	var names = [];

	            	//loop through data and build stuff
	            	_.each(data.results, function(v,i){


	            		var x = {};

	            		x.name = v.term_original;
	            		x.id = v.id;

	            		names.push(x);


	            	});


	            	//update the search box results
					var template = _.template(self.template_search_table);

					var html = template({names: names});

					$("#search-box-results table").first().html(html);

					//rebind
					$(".search-box-results-result").click(self.searchResultClick);

					//set the page
					$("#pagination").text(self.activeSearch.page + " of " + self.totalPages);

	            }
	        );







		},


		request_entity : function(id){

			var self = this;



			this.hideSearch();

			if (typeof id !== 'undefined'){ self.searchIds = [id];}

			$.get( "/terms/request_entity", { ids: self.searchIds} )
				.done(function( data ) {

					for (var x in self.searchIds){
						self.activeSearchIds.push('t' + self.searchIds[x]);
					}
					

					self.networkAddData(data);

					//clear the ids
					self.searchIds = [];


				}
			);

		},


		showHover : function(d){
			var self = this;

			//postion the hover box at the cursorish
			//terms-hover
			$("#terms-hover").css('display','block').css("top",self.mouseY - 50).css("left",self.mouseX +20);

			var showExpand = false, showRecord = false, url = '';

			if (d.type !== 'component' && d.type !== 'collection')
				showExpand = true;


			if (d.type === 'component'){
				showRecord = true;
				url = '/collection/' + d.collectionId + '/#c' + d.orgId; 
			}
			if (d.type === 'collection'){
				showRecord = true;
				url = '/collection/' + d.collectionId; 
			}

			if (d.primary)
				showExpand = false;



			var template = _.template(self.template_terms_hover);
			var html = template({hover: {type: self.termNames[d.type], title: d.title, record: showRecord, expand: showExpand, href: url}});
			$("#terms-hover").html(html);

			$("#term-expand").unbind('click').click(function(){ self.request_entity(d.orgId); });


		},

		hideHover : function(){

			$("#terms-hover").css('display','none');

		},

		initD3 : function(){


			var self = this;

			//test if we can do this
			if(!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect){
				return false;
				alert('We\'re Sorry, this visualization uses the SVG standard, most modern browsers support SVG. If you would like to see this visualization please view this page in another browser such as Google Chrome, Firefox, Safari, or Internet Explorer 9+');	
			}

			//try to dynamically load the d3 library

			$.getScript("/assets/d3.v3.js", function(data, textStatus, jqxhr) {

				if (textStatus === 'success'){


				window.setTimeout(function(){

					self.intitalized = true;

					//self.buildTitleIndex();
					self.initNetwork();

				}, 1000);

				}else{
					console.error("could not load d3");
				}
			});

		},


		initNetwork: function(){

			var self = this;


			//d3.select("#network svg").remove();
			//d3.select("#d3ToolTip").remove();
		
			//lod.network.tooltip = d3.select("body")
			//	.append("div")
			//	.attr('id','d3ToolTip');		
						
			this.networkWidth = $(".main-content.terms-index").width() - 3;
			this.networkHeight = $(".main-content.terms-index").height() - 3;
			//this.network.fill = d3.scale.category20();
			

			
			this.networkNodes = [];
			this.networkLinks = [];
			

			
			this.networkVis = d3.select(".main-content.terms-index").append("svg")
				.attr("width", self.networkWidth)
				.attr("height", self.networkHeight)
				.style("fill", "none")
				.call(d3.behavior.zoom()

				.on("zoom", function() {
					self.networkVis.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale*0.8 + ")");
				}));
				
			self.networkVis.append("rect")
				.attr("width", self.networkWidth)
				.attr("height", self.networkHeight);
				
		  

			self.networkVis = self.networkVis.append("g"); 

		 	self.networkVis.attr('transform','scale('+.8+')');
			
			var curve = d3.svg.line()
					  .interpolate("cardinal-closed")
					  .tension(.85);	

						
			self.networkForce = d3.layout.force()
	 			.charge(-1200)
				.gravity(0.1)				
				.distance(100)
				.linkStrength(0.2)
				.theta(1.5)
				.nodes(self.networkNodes)
				.links(self.networkLinks)
				.size([self.networkWidth, self.networkHeight]);			
		
		
				
			
			
			self.networkForce.on("tick", function() {
			
			
				
			  self.networkVis.selectAll(".network-link")
			  .attr("d", function(d) {
				var dx = d.target.x - d.source.x,
					dy = d.target.y - d.source.y,
					dr = Math.sqrt(dx * dx + dy * dy);
				return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
				});
				
				
			  self.networkVis.selectAll(".node")
				  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			
			
			  
			});		
		
			
			//lod.network.restart();

			$("body").append($("<div>").attr("id",'terms-hover'));


			$("#terms-hover").mouseenter(function(){
				window.clearTimeout(self.hoverTimer);
			})
			$("#terms-hover").mouseleave(function(){
				self.hoverTimer = window.setTimeout(function(){
					self.hideHover();
				},200);
			});

			//self.request_entity(29);







		},




	networkRestart : function(){
	
		var self = this;
	  

		self.networkVis.append("g").attr("id", "links")


		self.networkVis.select("#links").selectAll(".network-link")
			.data(self.networkLinks)
			.enter().append('path')
			.attr("class", "network-link")
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });
		


		var node = self.networkVis.selectAll(".node")
			.data(self.networkNodes)
			.enter().append("g")
			.attr("class", "node")
			.attr("id", function(d){ return "svg-node-" + d.vizId; })
			.call(self.networkForce.drag)
			.on("mouseover", function(d){

				window.clearTimeout(self.hoverTimer);
				self.showHover(d);


			})
			.on("mouseleave", function(d){

				self.showHover(d);

				self.hoverTimer = window.setTimeout(function(){


					self.hideHover();



				},200);


			})
			.on("click", function(d){


				window.clearTimeout(self.hoverTimer);
				self.showHover(d);


			})
	
		  .attr("x", function(d, i) { return self.networkWidth / 2 + i; })
		  .attr("y", function(d, i) { return self.networkWidth / 2 + i; });
		  
		node.append("rect")
			.attr("id", function(d){ return "svg-node-rect" + d.vizId })
			.attr("data-type", function(d){return d.type;})
			.style("fill", function(d){

				if (d.primary && d.type != 'corpname'){
					return "#3498db";
				}

				return "whitesmoke";

			}


			)
			.style("stroke","none")
			.attr("x", function(d) { 
				if (d.type == "corpname"){
					return -5;
				}
				if (d.type == 'collection'){

					return -20;

				}
				if (d.type == "component"){
					return -16;
				}

				return 0;

			 })
			.attr("y", function(d) { 
				if (d.type == "corpname"){
					return -10
				}
				if (d.type == 'collection'){

					return -10;

				}
				if (d.type == "component"){
					return -20
				}

				return 0;


			 })
			.attr("width", function(d) { 
				if (d.type == 'corpname'){

					return 20;

				}
				if (d.type == 'collection'){

					return 30;

				}

				if (d.type==='component'){
					return 33;
				}

				return 0;

			})
			.attr("height", function(d) { 
				if (d.type == 'corpname'){

					return 27;

				}
				if (d.type == 'collection'){

					return 27;

				}
				if (d.type==='component' ){
					return 40;
				}

				return 0;

			});  


		node
		.append("svg:path")
			.attr("id", function(d){ return "svg-node-path" + d.vizId })

			.attr("class",  function(d) { return "aNodePath_" + d.type})
			.attr("transform", function(d) {



						if (d.type=='collection'){
							var nodeSize = 1;// useSize(d.count) / 6; 
							return "translate(" + ((nodeSize * 25) * -1) + "," + ((nodeSize * 25) * -1) + ")scale(" + nodeSize + ")";				
						}

						if (d.type=='topic' || d.type=='subject'){
							var nodeSize = 1;//useSize(d.count) / 8; 
							return "translate(" + ((nodeSize * 25) *-1) + "," + ((nodeSize * 25) * -1) + ")scale(" + nodeSize + ")";				
						}

						if (d.type=='component'){
							var nodeSize = 1;//useSize(d.count) / 6; 
							return "translate(" + ((nodeSize * 25) *-1) + "," + ((nodeSize * 25) * -1) + ")scale(" + nodeSize + ")";				
						}

						if (d.type=='persname'){
							var nodeSize = 1;//useSize(d.count) / 6; 
							return "translate(" + ((nodeSize * 25) *-1) + "," + ((nodeSize * 40) * -1) + ")scale(" + nodeSize + ")";				
						}
						if (d.type=='corpname'){
							var nodeSize = 0.05;//useSize(d.count) / 6; 
							return "translate(" + ((nodeSize * 25) *-1) + "," + ((nodeSize * 40) * -1) + ")scale(" + nodeSize + ")";				
						}

				})	
			.style("fill",function(d){

				if (d.primary) return '#3498db';

				return 'grey';//useColor(d.type);
			})
			.style("stroke",function(d){

					if (d.type=='concept'){
						return "whitesmoke"
					}
					return "black";

			})
			.style("stroke-width",function(d){
					if (d.type=='concept'){
						return "1px"
					}		
					if (d.type=='component'){
						return "0.25px"
					}	
					return "0.75px";

			})			
			.attr("d",function(d){

 				if (d.type=='topic' || d.type=='subject'){
					return "M3.872,37.62c0.721,0.8,3.536,1.902,4.777,1.902c2.005,0,3.809-0.863,5.059-2.239 c2.217,1.575,4.925,2.504,7.852,2.504c4.217,0,7.984-1.923,10.475-4.939c1.133,0.307,2.32,0.472,3.55,0.472 c7.499,0.001,13.579-6.077,13.579-13.577c0-5.822-3.665-10.787-8.812-12.716c-1.933-5.148-6.896-8.812-12.718-8.812 c-4.848,0-9.099,2.542-11.502,6.365c-0.563-0.071-1.135-0.112-1.718-0.112c-7.499,0-13.578,6.079-13.578,13.579 c0,3.043,1.001,5.854,2.692,8.117c-1.065,1.205-1.713,2.788-1.713,4.524C1.815,33.942,2.054,36.587,3.872,37.62";
				}else if (d.type ==='collection'){
					return 'M15.984,21.382c-1.263-0.632-5.573-2.872-8.098-4.186l9.67,12.473v-6.873 C17.554,22.797,17.453,22.117,15.984,21.382z M45.164,6.888l0.014-0.052l-11.318-5.66c-0.141-0.061-0.646-0.258-1.271-0.258 c-0.416,0-0.789,0.085-1.139,0.259L5.84,13.982c-0.93,0.464-1.043,1.296-1.059,1.497v25.609c0,0.583,0.413,1.022,0.731,1.275 l-0.014,0.052l11.316,5.659c0.098,0.044,0.622,0.26,1.274,0.26c0.417,0,0.79-0.086,1.139-0.26l25.609-12.806 c0.93-0.465,1.045-1.296,1.059-1.497V8.163C45.895,7.581,45.482,7.141,45.164,6.888z M12.207,41.363 c-0.702,0.216-1.626-0.612-1.991-1.761c-0.194-0.612-0.22-1.231-0.073-1.742c0.075-0.257,0.262-0.71,0.685-0.843 c0.076-0.024,0.157-0.036,0.24-0.036c0.673,0,1.425,0.772,1.749,1.798C13.191,39.955,12.911,41.139,12.207,41.363z M44.828,18.073 L18.485,31.315v15.261c0,0.257-0.208,0.465-0.464,0.465c-0.257,0-0.464-0.209-0.464-0.465V31.188l-11.706-15.1 c-0.134-0.172-0.129-0.414,0.011-0.582c0.141-0.168,0.379-0.214,0.572-0.114c0.082,0.043,8.161,4.258,9.966,5.16 c0.824,0.413,1.32,0.839,1.622,1.21c0.302-0.371,0.797-0.798,1.622-1.21c1.811-0.906,24.365-11.848,24.591-11.958 c0.229-0.112,0.508-0.016,0.621,0.215c0.111,0.231,0.016,0.508-0.215,0.621c-0.229,0.11-22.777,11.05-24.583,11.954 c-1.422,0.711-1.562,1.368-1.573,1.43v7.463l25.927-13.033c0.229-0.114,0.508-0.024,0.623,0.207 C45.15,17.678,45.059,17.958,44.828,18.073z';
				}else if (d.type ==='component'){
					return 'M44.788,42.693l-3.244-18.12l2.459-18.237L38.14,5.546l-0.75-4.194L24.34,3.687l-13.134-1.77l-0.274,2.032 L8.245,3.95l0.001,2.617L4.818,7.181l3.24,18.113L5.603,43.542l2.666,0.359l0.001,2.045l3.483-0.001l0.461,2.578l13.036-2.334 l13.143,1.771l0.273-2.03l2.691-0.001l-0.001-2.622L44.788,42.693z M6.862,8.604l1.384-0.249l0.005,8.016L6.862,8.604z M7.583,42.031l0.682-5.063l0.004,5.156L7.583,42.031z M42.021,7.847l-0.507,3.774l-2.784-2.787l-0.265-1.466L42.021,7.847z M38.335,10.949l-4.002,0.002l-0.002-4.007L38.335,10.949z M35.965,3.396l0.341,1.903l-1.282-0.173l-1.325-1.325L35.965,3.396z M13.639,46.479l-0.095-0.534l3.097-0.002L13.639,46.479z M10.03,44.186L10.007,5.711l22.562-0.015l0.003,7.018l7.007-0.005 l0.019,31.458L10.03,44.186z M41.354,33.501l1.39,7.768l-1.386,0.25L41.354,33.501z M36.109,14.989l-22.347,0.015l0.001,1.761 l22.346-0.014V14.989z M36.112,19.796L13.765,19.81l0.002,1.761l22.346-0.013L36.112,19.796z M36.114,24.604l-22.346,0.014 l0.001,1.762l22.348-0.014L36.114,24.604z M36.119,29.408l-22.348,0.015l0.002,1.762l22.346-0.014V29.408z M13.774,34.231 l0.001,1.762l22.346-0.014v-1.762L13.774,34.231z';
				}else if (d.type ==='persname'){
					return 'M35.492,11.02c0,5.968-4.838,15.184-10.805,15.184c-5.967,0-10.805-9.216-10.805-15.184 c0-5.967,4.838-10.805,10.805-10.805C30.654,0.215,35.492,5.053,35.492,11.02z M41.988,25.065c0,0-4.775-1.118-10.559-1.73c-1.883,2.288-4.217,3.863-6.743,3.863 c-2.526,0-4.859-1.575-6.745-3.863c-5.781,0.612-10.557,1.73-10.557,1.73c-2.34,0-4.237,1.897-4.237,4.237v16.46 c0,2.34,1.897,4.237,4.237,4.237h34.603c2.338,0,4.237-1.896,4.237-4.237v-16.46C46.226,26.963,44.328,25.065,41.988,25.065z';
				}else if (d.type ==='corpname'){
					return "M487.16-91.94c-218.773,0-437.547,0-656.32,0 c-0.072-0.262-0.145-0.524-0.217-0.786c9.693-3.997,19.371-8.032,29.083-11.983c98.122-39.917,196.255-79.807,294.35-119.79 c3.481-1.419,6.36-1.461,9.911-0.011c105.886,43.227,211.821,86.331,317.747,129.458c1.897,0.772,3.773,1.597,5.66,2.397 C487.303-92.417,487.231-92.179,487.16-91.94z M482.015,408.45c0,13.799,0,27.519,0,41.565c-215.269,0-430.301,0-645.732,0 c0-13.688,0-27.422,0-41.565C51.385,408.45,266.537,408.45,482.015,408.45z M444.724,338.312c0,14.08,0,27.544,0,41.519c-190.414,0-380.69,0-571.595,0 c0-7.012,0-13.957,0-20.902c0-6.782,0-13.564,0-20.616C63.898,338.312,254.068,338.312,444.724,338.312z M-170.819-27.363c0-11.54,0-22.67,0-34.153c219.838,0,439.514,0,659.495,0 c0,11.329,0,22.574,0,34.153C268.979-27.363,49.298-27.363-170.819-27.363z M-11.377,300.978c-26.144,0-52.017,0-78.494,0c0-2.031,0-3.812,0-5.592 c0-92.126,0.04-184.252-0.109-276.379c-0.008-4.928,1.491-6.034,6.178-5.984c22.488,0.237,44.98,0.209,67.469,0.015 c4.187-0.036,5.293,1.212,5.288,5.336c-0.109,92.626-0.083,185.252-0.094,277.878C-11.139,297.715-11.282,299.179-11.377,300.978z M50.284,300.921c0-96.038,0-191.59,0-287.467c25.821,0,51.391,0,77.33,0 c0,95.685,0,191.365,0,287.467C102.002,300.921,76.32,300.921,50.284,300.921z M190.35,13.265c25.749,0,51.344,0,77.279,0c0,95.767,0,191.473,0,287.442 c-25.768,0-51.357,0-77.279,0C190.35,204.932,190.35,109.222,190.35,13.265z M329.979,13.456c1.584-0.124,2.872-0.312,4.16-0.313 c22.99-0.018,45.98,0.062,68.97-0.09c3.686-0.023,4.841,0.98,4.837,4.763c-0.097,93.126-0.075,186.253-0.083,279.379 c0,1.137-0.104,2.273-0.178,3.761c-25.996,0-51.694,0-77.706,0C329.979,205.08,329.979,109.399,329.979,13.456z";
				}

			});



			node.append("svg:text")
				.style("fill", function(d) {

					if (d.type == "subject" || d.type == "topic"){
						return "black";
					}

					return 'black';

				})
				.attr("y", function(d){

					if (d.type == "collection" || d.type == "component" || d.type == "persname" || d.type == "corpname"){
						return 30
					}
					if (d.type == "subject" || d.type == "topic"){
						return 0
					}
				})
				.style("stroke", function(d) {


					if (d.type == "subject" || d.type == "topic"){
						return 'black'
					}

					return 'none';
				})
				.style("stroke-width","0.1px")

				/*
				.attr("transform", function(d) {

					if (d.type==='folder'){
						return "translate(" + (10 - 4)  * -1 + "," + 10 * 2 * -1 + ")rotate(-30)";
					}

				})
				*/

				.text(function(d){ 


					return d.title;
					
					/*if (d.title){
						return d.title;
					}else{
						return "";
					}*/

				 })
				.attr("text-anchor", "middle")

				.attr("display", function(d) { 

						return "block";	

				})
				.style("font-size", function(d) { 

						if (d.type == "subject" || d.type == "topic"){

							return 8;

						}
						if (d.type == "collection"){

							return 10;
							

						}

						return 10;

				}); 


		self.networkForce.start();
	
			
	},

	networkAddData: function(data){

		var self = this;


		_.each(data, function(aData){

			_.each(aData.nodes, function(v,i){


				//is it already in the array?

				if (typeof self.nodeIndex[v.id] == 'undefined'){

					var useId = self.networkNodes.length-1;
					useId++;

					var isPrimary = (self.activeSearchIds.indexOf(v.id) > -1) ? true : false;

					var orgId = v.id.replace(/com/ig,'').replace(/col/ig,'').replace(/t/ig,'');
					self.networkNodes.push({id: useId, title : v.title, type: v.type.toLowerCase(), primary : isPrimary, orgId: orgId, vizId: v.id, collectionId : v.collection });
					self.nodeIndex[v.id] = useId;
				}
			});


			_.each(aData.edges, function(v,i){

				if (self.edgesAdded.indexOf((v.source + v.target)) == -1){

					self.networkLinks.push({source: self.networkNodes[self.nodeIndex[v.source]], target: self.networkNodes[self.nodeIndex[v.target]]});
					self.edgesAdded.push(v.source + v.target);
				}

			})

		});

	
		this.networkForce.nodes(this.networkNodes);

		this.networkForce.links(this.networkLinks);
		this.networkRestart();

		for (var x in this.activeSearchIds){

			this.networkVis.select("#svg-node-path" + this.activeSearchIds[x]).style('fill','#3498db');


			

			if (this.networkVis.select("#svg-node-rect" + this.activeSearchIds[x]).attr("data-type") !== 'corpname'){


				this.networkVis.select("#svg-node-rect" + this.activeSearchIds[x]).style('fill','#3498db');	
			} 

			


		}
		

		//next time we do this make sure to lock the exiting nodes
		this.lockNodes = true;


	}



	};

	$(document).ready(function(){

		window.Archives.termsVis.init();





	});



}).call(this);