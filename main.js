// IIFE
(() => {

	//Choose an array method to implement for each of the incomplete functions.
	//FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

	//Remember, you can chain together array function calls to attain your goals.
	// Ex: array.filter().map()

	//Get data for the TV Show "Friends"
	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then((response) => response.json())
    .then((json) => {
        //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output

        //1 - Create a function called getGuntherCount() which returns the total number of episodes 
        // where the character Gunther is mentioned in the episode summary.
        console.log('--------------------------------');
        console.log(`Gunther Count: ${getGuntherCount(json)}`);

        //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
        console.log('--------------------------------');
        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);

        //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
        console.log('--------------------------------');
        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, "2000")}`);

        //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
        console.log('--------------------------------');
        console.log(`Female Cast Members:`);
        console.log(getFemaleCastMembers(json));

        //5 - Create a function called getEpisodeTitles() which returns a list of episode
        //    where the argument string is found in the episode summary.
        console.log('--------------------------------');
        console.log(`Episodes that mention Ursula:`);
        console.log(getEpisodeTitles(json, 'Ursula'));

        //6 - Create a function called getCastMembersOver55() which returns a list of cast members
        //    who are currently older than 55 years of age.
        console.log('--------------------------------');
        console.log(`Cast Members over 55:`);
        console.log(getCastMembersOver55(json));

        //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
        //    runtime minutes for all episodes excluding episodes in season 6
        console.log('--------------------------------');
        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);
    
        //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
        //    but only return an array of JSON objects containing the season number and episode name
        console.log('--------------------------------');
        console.log(`Episode JSON for first four seasons:`)
        console.log(getFirstFourSeasons(json));

        //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
        console.log('--------------------------------');
        console.log(`Tally of episodes by season:`);
        console.log(getEpisodeTallyBySeason(json));

        //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
        //the name and summary of the episodes.
        console.log('--------------------------------');
        console.log('Capitalized Friends');
        console.log(capitalizeTheFriends(json));

    })

	// COMPLETE THE FOLLOWING FUNCTIONS BY IMPLEMENTING MAP, REDUCE, OR FILTER 
	// (or a combination) ON THE PROVIDED JSON DATA

	// Define the required ten functions below this line...
    //1 - Create a function called getGuntherCount() which returns the total number of episodes 
    // where the character Gunther is mentioned in the episode summary.
    /**
     * 
     * @param {JSON} json 
     */
    function getGuntherCount(json) {
        return json._embedded.episodes.filter(episode => episode.summary.includes("Gunther")).length
    }

    //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
    /**
     * 
     * @param {JSON} json 
     */
    function getTotalRuntimeMinutes(json) {
        return json._embedded.episodes.map(episode => episode.runtime).reduce((x, y) => x + y, 0)
    }

    //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
    /**
     * 
     * @param {JSON} json 
     * @param {String} title
     */
    function getTotalEpisodesInYear(json, year) {
        return json._embedded.episodes.filter(episode => episode.airdate.includes(year)).length
    }

    //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
    /**
     * 
     * @param {JSON} json 
     */
    function getFemaleCastMembers(json) {
        return json._embedded.cast.filter(cast => cast.person.gender == "Female").map(cast => cast.person.name)
    }

    //5 - Create a function called getEpisodeTitles() which returns a list of episode
    //    where the argument string is found in the episode summary.
    /**
     * 
     * @param {JSON} json 
     * @param {String} title
     */
    function getEpisodeTitles(json, title) {
        return json._embedded.episodes.filter(episode => episode.summary.includes(title))
    }

    //6 - Create a function called getCastMembersOver55() which returns a list of cast members
    //    who are currently older than 55 years of age.
    /**
     * 
     * @param {JSON} json 
     */
    function getCastMembersOver55(json) {
        return json._embedded.cast.filter(cast => ((Date.now() - new Date(cast.person.birthday)) / 31556952000 > 55))
    }

    //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
    //    runtime minutes for all episodes excluding episodes in season 6
    /**
     * 
     * @param {JSON} json 
     */
    function getTotalRuntimeMinutesExcludingSeasonSix(json) {
        return json._embedded.episodes.filter(episode => episode.season != 6).map(episode => episode.runtime).reduce((x, y) => x + y, 0)
    }

    //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
    //    but only return an array of JSON objects containing the season number and episode name
    /**
     * 
     * @param {JSON} json 
     */
    function getFirstFourSeasons(json) {
        return json._embedded.episodes.filter(episode => episode.season <= 4).map(episode => ({"season":episode.season, "name":episode.name}))
    }

    //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
    /**
     * 
     * @param {JSON} json 
     */
    function getEpisodeTallyBySeason(json) {
        return json._embedded.episodes.reduce((counts, episode) => {
            counts[episode.season] = (counts[episode.season] || 0) + 1;
            return counts;
          }, {})
    }

    //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
    //the name and summary of the episodes.
    /**
     * 
     * @param {JSON} json 
     */
    function capitalizeTheFriends(json) {
        let arr = json._embedded.episodes.map(episode => ({"summary":episode.summary, "name":episode.name}))
        arr.forEach(episode => {
            episode.summary = episode.summary.replaceAll(/Joey|Chandler|Monica|Rachel|Phoebe|Ross/gi, function(x) {
                return x.toUpperCase()
            })
            episode.name = episode.name.replace(/Joey|Chandler|Monica|Rachel|Phoebe|Ross/, function(x) {
                return x.toUpperCase()
            })
        });
        return arr
    }


})();

