Extracted backend and frontend modules that run [archives.nypl.org/terms](http://archives.nypl.org/terms)

This code is not runnable as is. It is for demonstration purposes.

terms_controller.rb
-
Is the Rails controller for querying our database for a requested term and returning collections and components that match and other terms associated with them. This is a sample output for a request for "Kerouac, Jack, 1922-1969"

```
[
    {
        "nodes": [
            {
                "id": "t5154",
                "title": "Kerouac, Jack, 1922-1969",
                "type": "persname",
                "primary": true
            },
            {
                "id": "col238",
                "type": "Collection",
                "title": "Alfred Kazin collection of papers",
                "collection": "238"
            },
            {
                "id": "col6562",
                "type": "Collection",
                "title": "William S. Burroughs papers",
                "collection": "6562"
            },
            {
                "id": "col2985",
                "type": "Collection",
                "title": "Jack Kerouac collection of papers",
                "collection": "2985"
            },
            {
                "id": "com297307",
                "type": "Component",
                "title": "On the road (Screenplay) / Robert Guenette.",
                "collection": "4341"
            },
            {
                "id": "col2986",
                "type": "Collection",
                "title": "Jack Kerouac Papers",
                "collection": "2986"
            },
            {
                "id": "col2986",
                "type": "Collection"
            },
            {
                "id": "col4341",
                "type": "Collection",
                "title": "Montgomery Clift papers",
                "collection": "4341"
            },
            {
                "id": "t5154",
                "title": "Kerouac, Jack, 1922-1969",
                "type": "persname"
            },
            {
                "id": "t55972",
                "title": "Lantz, Robert, 1914-",
                "type": "persname"
            },
            {
                "id": "t55973",
                "title": "On the road (Screenplay)",
                "type": "title"
            },
            {
                "id": "t55974",
                "title": "Robert Guenette",
                "type": "persname"
            },
            {
                "id": "t51649",
                "title": "On The Road",
                "type": "title"
            },
            {
                "id": "t5136",
                "title": "Kazin, Alfred, 1915-1998",
                "type": "persname"
            },
            {
                "id": "t5137",
                "title": "Arendt, Hannah, 1906-1975",
                "type": "persname"
            },
            {
                "id": "t5138",
                "title": "Bellow, Saul",
                "type": "persname"
            },
            {
                "id": "t5139",
                "title": "Bishop, Elizabeth, 1911-1979",
                "type": "persname"
            },
            {
                "id": "t5140",
                "title": "Burnshaw, Stanley, 1906-2005",
                "type": "persname"
            },
            {
                "id": "t5141",
                "title": "Capote, Truman, 1924-1984",
                "type": "persname"
            },
            {
                "id": "t5142",
                "title": "Davison, Peter, 1928-",
                "type": "persname"
            },
            {
                "id": "t5143",
                "title": "Dawidowicz, Lucy S",
                "type": "persname"
            },
            {
                "id": "t4661",
                "title": "Diamond, David, 1915-2005",
                "type": "persname"
            },
            {
                "id": "t5144",
                "title": "Dos Passos, John, 1896-1970",
                "type": "persname"
            },
            {
                "id": "t5145",
                "title": "Edel, Leon, 1907-1997",
                "type": "persname"
            },
            {
                "id": "t5146",
                "title": "Elliott, George P., 1918-1980",
                "type": "persname"
            },
            {
                "id": "t5047",
                "title": "Farrell, James T. (James Thomas), 1904-1979",
                "type": "persname"
            },
            {
                "id": "t5147",
                "title": "Faulkner, William, 1897-1962",
                "type": "persname"
            },
            {
                "id": "t5148",
                "title": "Flint, Robert",
                "type": "persname"
            },
            {
                "id": "t5149",
                "title": "Gold, Herbert, 1924-",
                "type": "persname"
            },
            {
                "id": "t5150",
                "title": "Herbst, Josephine, 1892-1969",
                "type": "persname"
            },
            {
                "id": "t5151",
                "title": "Hoagland, Edward",
                "type": "persname"
            },
            {
                "id": "t4062",
                "title": "Howe, Irving",
                "type": "persname"
            },
            {
                "id": "t5152",
                "title": "Jarrell, Randall, 1914-1965",
                "type": "persname"
            },
            {
                "id": "t5153",
                "title": "Jones, Howard Mumford, 1892-1980",
                "type": "persname"
            },
            {
                "id": "t5154",
                "title": "Kerouac, Jack, 1922-1969",
                "type": "persname"
            },
            {
                "id": "t5155",
                "title": "Langer, Elinor, 1939-",
                "type": "persname"
            },
            {
                "id": "t5156",
                "title": "Levin, Harry, 1912-",
                "type": "persname"
            },
            {
                "id": "t5157",
                "title": "McCullers, Carson, 1917-1967",
                "type": "persname"
            },
            {
                "id": "t5158",
                "title": "Malamud, Bernard",
                "type": "persname"
            },
            {
                "id": "t5159",
                "title": "Matthiessen, F. O. (Francis Otto), 1902-1950",
                "type": "persname"
            },
            {
                "id": "t5160",
                "title": "Mitgang, Herbert",
                "type": "persname"
            },
            {
                "id": "t5161",
                "title": "Mumford, Lewis, 1895-1990",
                "type": "persname"
            },
            {
                "id": "t5162",
                "title": "Plath, Sylvia",
                "type": "persname"
            },
            {
                "id": "t5163",
                "title": "Riding, Laura, 1901-1991",
                "type": "persname"
            },
            {
                "id": "t5164",
                "title": "Rosenberg, Harold, 1906-1978",
                "type": "persname"
            },
            {
                "id": "t5165",
                "title": "Rosenfeld, Isaac, 1918-1956",
                "type": "persname"
            },
            {
                "id": "t5166",
                "title": "Roth, Philip",
                "type": "persname"
            },
            {
                "id": "t5167",
                "title": "Rukeyser, Muriel, 1913-",
                "type": "persname"
            },
            {
                "id": "t5168",
                "title": "Sinclair, Upton, 1878-1968",
                "type": "persname"
            },
            {
                "id": "t5169",
                "title": "Steegmuller, Francis, 1906-",
                "type": "persname"
            },
            {
                "id": "t5170",
                "title": "Untermeyer, Louis, 1885-1977",
                "type": "persname"
            },
            {
                "id": "t5171",
                "title": "Updike, John",
                "type": "persname"
            },
            {
                "id": "t5172",
                "title": "Van Doren, Mark, 1894-1972",
                "type": "persname"
            },
            {
                "id": "t5173",
                "title": "Wain, John",
                "type": "persname"
            },
            {
                "id": "t4674",
                "title": "Welty, Eudora, 1909-2001",
                "type": "persname"
            },
            {
                "id": "t5174",
                "title": "Wilson, Edmund, 1895-1972",
                "type": "persname"
            },
            {
                "id": "t5175",
                "title": "Yglesias, Jose",
                "type": "persname"
            },
            {
                "id": "t20489",
                "title": "Blake, Carolyn",
                "type": "persname"
            },
            {
                "id": "t15308",
                "title": "Giroux, Robert",
                "type": "persname"
            },
            {
                "id": "t5136",
                "title": "Kazin, Alfred, 1915-1998",
                "type": "persname"
            },
            {
                "id": "t20490",
                "title": "Kerouac, Gabrielle",
                "type": "persname"
            },
            {
                "id": "t20491",
                "title": "Whalen, Philip",
                "type": "persname"
            },
            {
                "id": "t15308",
                "title": "Giroux, Robert",
                "type": "persname"
            },
            {
                "id": "t5154",
                "title": "Kerouac, Jack, 1922-1969",
                "type": "persname"
            },
            {
                "id": "t5154",
                "title": "Kerouac, Jack, 1922-1969",
                "type": "persname"
            },
            {
                "id": "t159636",
                "title": "Amburn, Ellis",
                "type": "persname"
            },
            {
                "id": "t159637",
                "title": "Apostolos, George J",
                "type": "persname"
            },
            {
                "id": "t159638",
                "title": "Avakian, Albert",
                "type": "persname"
            },
            {
                "id": "t7554",
                "title": "Baraka, Amiri, 1934-",
                "type": "persname"
            },
            {
                "id": "t159639",
                "title": "Beaulieu, Joseph Henry",
                "type": "persname"
            },
            {
                "id": "t159640",
                "title": "Beckwith, Jacques",
                "type": "persname"
            },
            {
                "id": "t159641",
                "title": "Beckwith, L. (Lois)",
                "type": "persname"
            },
            {
                "id": "t159642",
                "title": "Blake, Carolyn",
                "type": "persname"
            },
            {
                "id": "t159643",
                "title": "Blake, Paul, (Mechanic)",
                "type": "persname"
            },
            {
                "id": "t13329",
                "title": "Buckley, William F. (William Frank), 1925-2008",
                "type": "persname"
            },
            {
                "id": "t20508",
                "title": "Burroughs, William S., 1914-1997",
                "type": "persname"
            },
            {
                "id": "t159644",
                "title": "Carney, Mary (Maggie Cassidy inspiration)",
                "type": "persname"
            },
            {
                "id": "t159645",
                "title": "Carr, Lucien, 1924?-",
                "type": "persname"
            },
            {
                "id": "t159646",
                "title": "Cassady, Carolyn",
                "type": "persname"
            },
            {
                "id": "t20492",
                "title": "Cassady, Neal",
                "type": "persname"
            },
            {
                "id": "t159647",
                "title": "Charters, Ann",
                "type": "persname"
            },
            {
                "id": "t159648",
                "title": "Chase, Hal",
                "type": "persname"
            },
            {
                "id": "t159649",
                "title": "Chippindale, Harry",
                "type": "persname"
            },
            {
                "id": "t17821",
                "title": "Corso, Gregory",
                "type": "persname"
            },
            {
                "id": "t159650",
                "title": "Cowley, Malcolm, 1898-1989",
                "type": "persname"
            },
            {
                "id": "t159651",
                "title": "Creeley, Robert, 1926-2005",
                "type": "persname"
            },
            {
                "id": "t159652",
                "title": "Cru, Henri",
                "type": "persname"
            },
            {
                "id": "t159653",
                "title": "Cudworth, James",
                "type": "persname"
            },
            {
                "id": "t159654",
                "title": "Dastou, George",
                "type": "persname"
            },
            {
                "id": "t159655",
                "title": "Donovan, Vincent C., Father",
                "type": "persname"
            },
            {
                "id": "t159656",
                "title": "Ferlinghetti, Lawrence",
                "type": "persname"
            },
            {
                "id": "t159657",
                "title": "Fitzgerald, Jack",
                "type": "persname"
            },
            {
                "id": "t159658",
                "title": "Garver, William",
                "type": "persname"
            },
            {
                "id": "t15202",
                "title": "Ginsberg, Allen, 1926-1997",
                "type": "persname"
            },
            {
                "id": "t159659",
                "title": "Giroux, Robert",
                "type": "persname"
            },
            {
                "id": "t159660",
                "title": "Guernic, Youenn",
                "type": "persname"
            },
            {
                "id": "t159661",
                "title": "Holmes, John Clellon, 1926-1988",
                "type": "persname"
            },
            {
                "id": "t159662",
                "title": "Huncke, Herbert, E",
                "type": "persname"
            },
            {
                "id": "t159663",
                "title": "Jeffries, Frank",
                "type": "persname"
            },
            {
                "id": "t5136",
                "title": "Kazin, Alfred, 1915-1998",
                "type": "persname"
            },
            {
                "id": "t159664",
                "title": "Kerouac, Edie Parker, 1923-1992",
                "type": "persname"
            },
            {
                "id": "t159665",
                "title": "Kerouac, Gabrielle",
                "type": "persname"
            },
            {
                "id": "t159666",
                "title": "Kerouac, Joan, d. 1990",
                "type": "persname"
            },
            {
                "id": "t159667",
                "title": "Kerouac, Leo",
                "type": "persname"
            },
            {
                "id": "t159668",
                "title": "Kerouac, Stella",
                "type": "persname"
            },
            {
                "id": "t159669",
                "title": "Krim, Seymour, 1922-",
                "type": "persname"
            },
            {
                "id": "t159670",
                "title": "Lamantia, Philip, 1927-2005",
                "type": "persname"
            },
            {
                "id": "t159671",
                "title": "Lax, Robert",
                "type": "persname"
            },
            {
                "id": "t151867",
                "title": "Leary, Timothy, 1920-1996",
                "type": "persname"
            },
            {
                "id": "t159672",
                "title": "Lord, Sterling, 1920-",
                "type": "persname"
            },
            {
                "id": "t159673",
                "title": "MacManus, Patricia",
                "type": "persname"
            },
            {
                "id": "t159674",
                "title": "McClure, Mike",
                "type": "persname"
            },
            {
                "id": "t159675",
                "title": "Micheline, Jack, 1929-1998",
                "type": "persname"
            }
        ],
        "edges": [
            {
                "id": 1,
                "source": "t5154",
                "target": "col238"
            },
            {
                "id": 2,
                "source": "t5154",
                "target": "col6562"
            },
            {
                "id": 3,
                "source": "t5154",
                "target": "col2985"
            },
            {
                "id": 4,
                "source": "t5154",
                "target": "com297307"
            },
            {
                "id": 5,
                "source": "t5154",
                "target": "col2986"
            },
            {
                "id": 6,
                "source": "t5154",
                "target": "col2986"
            },
            {
                "id": 7,
                "source": "com297307",
                "target": "col4341"
            },
            {
                "id": 8,
                "source": "com297307",
                "target": "col4341"
            },
            {
                "id": 9,
                "source": "t5154",
                "target": "com297307"
            },
            {
                "id": 10,
                "source": "t55972",
                "target": "com297307"
            },
            {
                "id": 11,
                "source": "t55973",
                "target": "com297307"
            },
            {
                "id": 12,
                "source": "t55974",
                "target": "com297307"
            },
            {
                "id": 13,
                "source": "t51649",
                "target": "com297307"
            },
            {
                "id": 14,
                "source": "t5136",
                "target": "col238"
            },
            {
                "id": 15,
                "source": "t5137",
                "target": "col238"
            },
            {
                "id": 16,
                "source": "t5138",
                "target": "col238"
            },
            {
                "id": 17,
                "source": "t5139",
                "target": "col238"
            },
            {
                "id": 18,
                "source": "t5140",
                "target": "col238"
            },
            {
                "id": 19,
                "source": "t5141",
                "target": "col238"
            },
            {
                "id": 20,
                "source": "t5142",
                "target": "col238"
            },
            {
                "id": 21,
                "source": "t5143",
                "target": "col238"
            },
            {
                "id": 22,
                "source": "t4661",
                "target": "col238"
            },
            {
                "id": 23,
                "source": "t5144",
                "target": "col238"
            },
            {
                "id": 24,
                "source": "t5145",
                "target": "col238"
            },
            {
                "id": 25,
                "source": "t5146",
                "target": "col238"
            },
            {
                "id": 26,
                "source": "t5047",
                "target": "col238"
            },
            {
                "id": 27,
                "source": "t5147",
                "target": "col238"
            },
            {
                "id": 28,
                "source": "t5148",
                "target": "col238"
            },
            {
                "id": 29,
                "source": "t5149",
                "target": "col238"
            },
            {
                "id": 30,
                "source": "t5150",
                "target": "col238"
            },
            {
                "id": 31,
                "source": "t5151",
                "target": "col238"
            },
            {
                "id": 32,
                "source": "t4062",
                "target": "col238"
            },
            {
                "id": 33,
                "source": "t5152",
                "target": "col238"
            },
            {
                "id": 34,
                "source": "t5153",
                "target": "col238"
            },
            {
                "id": 35,
                "source": "t5154",
                "target": "col238"
            },
            {
                "id": 36,
                "source": "t5155",
                "target": "col238"
            },
            {
                "id": 37,
                "source": "t5156",
                "target": "col238"
            },
            {
                "id": 38,
                "source": "t5157",
                "target": "col238"
            },
            {
                "id": 39,
                "source": "t5158",
                "target": "col238"
            },
            {
                "id": 40,
                "source": "t5159",
                "target": "col238"
            },
            {
                "id": 41,
                "source": "t5160",
                "target": "col238"
            },
            {
                "id": 42,
                "source": "t5161",
                "target": "col238"
            },
            {
                "id": 43,
                "source": "t5162",
                "target": "col238"
            },
            {
                "id": 44,
                "source": "t5163",
                "target": "col238"
            },
            {
                "id": 45,
                "source": "t5164",
                "target": "col238"
            },
            {
                "id": 46,
                "source": "t5165",
                "target": "col238"
            },
            {
                "id": 47,
                "source": "t5166",
                "target": "col238"
            },
            {
                "id": 48,
                "source": "t5167",
                "target": "col238"
            },
            {
                "id": 49,
                "source": "t5168",
                "target": "col238"
            },
            {
                "id": 50,
                "source": "t5169",
                "target": "col238"
            },
            {
                "id": 51,
                "source": "t5170",
                "target": "col238"
            },
            {
                "id": 52,
                "source": "t5171",
                "target": "col238"
            },
            {
                "id": 53,
                "source": "t5172",
                "target": "col238"
            },
            {
                "id": 54,
                "source": "t5173",
                "target": "col238"
            },
            {
                "id": 55,
                "source": "t4674",
                "target": "col238"
            },
            {
                "id": 56,
                "source": "t5174",
                "target": "col238"
            },
            {
                "id": 57,
                "source": "t5175",
                "target": "col238"
            },
            {
                "id": 58,
                "source": "t20489",
                "target": "col2985"
            },
            {
                "id": 59,
                "source": "t15308",
                "target": "col2985"
            },
            {
                "id": 60,
                "source": "t5136",
                "target": "col2985"
            },
            {
                "id": 61,
                "source": "t20490",
                "target": "col2985"
            },
            {
                "id": 62,
                "source": "t20491",
                "target": "col2985"
            },
            {
                "id": 63,
                "source": "t15308",
                "target": "col2985"
            },
            {
                "id": 64,
                "source": "t5154",
                "target": "col2985"
            },
            {
                "id": 65,
                "source": "t5154",
                "target": "col2986"
            },
            {
                "id": 66,
                "source": "t159636",
                "target": "col2986"
            },
            {
                "id": 67,
                "source": "t159637",
                "target": "col2986"
            },
            {
                "id": 68,
                "source": "t159638",
                "target": "col2986"
            },
            {
                "id": 69,
                "source": "t7554",
                "target": "col2986"
            },
            {
                "id": 70,
                "source": "t159639",
                "target": "col2986"
            },
            {
                "id": 71,
                "source": "t159640",
                "target": "col2986"
            },
            {
                "id": 72,
                "source": "t159641",
                "target": "col2986"
            },
            {
                "id": 73,
                "source": "t159642",
                "target": "col2986"
            },
            {
                "id": 74,
                "source": "t159643",
                "target": "col2986"
            },
            {
                "id": 75,
                "source": "t13329",
                "target": "col2986"
            },
            {
                "id": 76,
                "source": "t20508",
                "target": "col2986"
            },
            {
                "id": 77,
                "source": "t159644",
                "target": "col2986"
            },
            {
                "id": 78,
                "source": "t159645",
                "target": "col2986"
            },
            {
                "id": 79,
                "source": "t159646",
                "target": "col2986"
            },
            {
                "id": 80,
                "source": "t20492",
                "target": "col2986"
            },
            {
                "id": 81,
                "source": "t159647",
                "target": "col2986"
            },
            {
                "id": 82,
                "source": "t159648",
                "target": "col2986"
            },
            {
                "id": 83,
                "source": "t159649",
                "target": "col2986"
            },
            {
                "id": 84,
                "source": "t17821",
                "target": "col2986"
            },
            {
                "id": 85,
                "source": "t159650",
                "target": "col2986"
            },
            {
                "id": 86,
                "source": "t159651",
                "target": "col2986"
            },
            {
                "id": 87,
                "source": "t159652",
                "target": "col2986"
            },
            {
                "id": 88,
                "source": "t159653",
                "target": "col2986"
            },
            {
                "id": 89,
                "source": "t159654",
                "target": "col2986"
            },
            {
                "id": 90,
                "source": "t159655",
                "target": "col2986"
            },
            {
                "id": 91,
                "source": "t159656",
                "target": "col2986"
            },
            {
                "id": 92,
                "source": "t159657",
                "target": "col2986"
            },
            {
                "id": 93,
                "source": "t159658",
                "target": "col2986"
            },
            {
                "id": 94,
                "source": "t15202",
                "target": "col2986"
            },
            {
                "id": 95,
                "source": "t159659",
                "target": "col2986"
            },
            {
                "id": 96,
                "source": "t159660",
                "target": "col2986"
            },
            {
                "id": 97,
                "source": "t159661",
                "target": "col2986"
            },
            {
                "id": 98,
                "source": "t159662",
                "target": "col2986"
            },
            {
                "id": 99,
                "source": "t159663",
                "target": "col2986"
            },
            {
                "id": 100,
                "source": "t5136",
                "target": "col2986"
            },
            {
                "id": 101,
                "source": "t159664",
                "target": "col2986"
            },
            {
                "id": 102,
                "source": "t159665",
                "target": "col2986"
            },
            {
                "id": 103,
                "source": "t159666",
                "target": "col2986"
            },
            {
                "id": 104,
                "source": "t159667",
                "target": "col2986"
            },
            {
                "id": 105,
                "source": "t159668",
                "target": "col2986"
            },
            {
                "id": 106,
                "source": "t159669",
                "target": "col2986"
            },
            {
                "id": 107,
                "source": "t159670",
                "target": "col2986"
            },
            {
                "id": 108,
                "source": "t159671",
                "target": "col2986"
            },
            {
                "id": 109,
                "source": "t151867",
                "target": "col2986"
            },
            {
                "id": 110,
                "source": "t159672",
                "target": "col2986"
            },
            {
                "id": 111,
                "source": "t159673",
                "target": "col2986"
            },
            {
                "id": 112,
                "source": "t159674",
                "target": "col2986"
            },
            {
                "id": 113,
                "source": "t159675",
                "target": "col2986"
            }
        ]
    }
]
```

terms.js
-

This is the client side part that use D3.js to initialize and build a force directed layout based on the output from the server.

index.html.erb, terms.scss
-
Disembodied stubs of the template and sass style for the tool.
