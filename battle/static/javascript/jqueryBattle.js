$(document).ready(function(){
   //We don't know who are contenders are yet!
   $("#champ1_results").hide();
   $("#champ2_results").hide();

   //Some default values to help out
   $("#champ1_URL").val("https://github.com/django/django");
   $("#champ2_URL").val("https://github.com/mbostock/d3");

   //Battle it out!
   $(".btn").click(function(event){
      event.preventDefault();

      var champ1_result = null;
      var champ2_result = null;

      $("#champ1_results").removeClass("champion");
      $("#champ2_results").removeClass("champion");

      $("#message").text("Fetching Data...");

      //get url for champ1
      var formURL = $("#champ1_URL").val();
      if(formURL.startsWith('https://github.com/')){
         var api_url = "https://api.github.com/repos/"+formURL.substring(19);
      }else{
         $("#message").text("Please enter repos using urls of the form https://github.com/{USER}/{REPO}");
         return;
      }

      var determineWinner=function(sum1,sum2){
         $("#message").text("");
         if(champ1_result.sum == champ2_result.sum){
            $("#winner").text("It's a tie!");
         }else if(champ1_result.sum > champ2_result.sum){
            $("#winner").text("Repo 1 wins!");
            $("#champ1_results").addClass("champion");
         }else{
            $("#winner").text("Repo 2 wins!");
            $("#champ2_results").addClass("champion");
         }
      }

      //Champ1 data call
      $.ajax({
         url: api_url,
         datatype: "json",
         success: function(result){
            if(result.message && result.message=="Not Found"){
               $("#message").text("Repo not found, please check your URL.");
            }else{
               champ1_result = {
                  "stars":result.stargazers_count,
                  "watchers":result.watchers_count,
                  "forks":result.forks_count,
                  "sum":result.stargazers_count+result.watchers_count+result.forks_count,
               };
               var champ1 = $("#champ1_results");
               champ1.show()
               champ1.children(".stars").text("Stars:\t"+champ1_result.stars);
               champ1.children(".watchers").text("Watchers:\t"+champ1_result.watchers);
               champ1.children(".forks").text("Forks:\t"+champ1_result.forks);
               champ1.children(".sum").text("Total:\t"+champ1_result.sum);
            }

            if(champ1_result && champ2_result){
               determineWinner(champ1_result.sum,champ2_result.sum);
            }
         },
         error: function(){
            $("#message").text("Error: Repo not Found.\nPlease enter repos using urls of the form https://github.com/{USER}/{REPO}");
         },
      });

      //Get url for champ2
      formURL = $("#champ2_URL").val();
      if(formURL.startsWith('https://github.com/')){
         api_url = "https://api.github.com/repos/"+formURL.substring(19);
      }else{
         $("#message").text("Please enter repos using urls of the form https://github.com/{USER}/{REPO}");
         return;
      }

      //Call for Champ2's data
      $.ajax({
         url: api_url,
         datatype: "json",
         success: function(result){
            if(result.message && result.message=="Not Found"){
               $("#message").text("Repo not found, please check your URL.");
            }else{
               champ2_result = {
                  "stars":result.stargazers_count,
                  "watchers":result.watchers_count,
                  "forks":result.forks_count,
                  "sum":result.stargazers_count+result.watchers_count+result.forks_count,
               };
               var champ2 = $("#champ2_results");
               champ2.show()
               champ2.children(".stars").text("Stars:\t"+champ2_result.stars);
               champ2.children(".watchers").text("Watchers:\t"+champ2_result.watchers);
               champ2.children(".forks").text("Forks:\t"+champ2_result.forks);
               champ2.children(".sum").text("Total:\t"+champ2_result.sum);
            }

            if(champ1_result && champ2_result){
               determineWinner(champ1_result.sum,champ2_result.sum);
            }
         },
         error: function(){
            $("#message").text("Error: Repo not Found.\nPlease enter repos using urls of the form https://github.com/{USER}/{REPO}");
         },
      });
   });
});
