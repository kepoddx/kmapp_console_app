

<script id="stories" type="text/x-handlebars-template">
<div class="story-container">
  {{#each data}}
  <a href="{{this.storyLink}}" class="story-link row">
 <div class="story-image col-sm-5">
 	<img src="{{this.imageLink}}" class="img-responsive"/>
 </div>
 <div class="story-title col-sm-7">
 	<div class="row">
    <div class="col-sm-12">
 	<p class="title">{{this.title}}<p>
    </div>
       <div class="col-sm-12">
    <p class="description">{{this.description}}<span class="more">...Read More</span></p>
    </div>
  </div>  
 </div>
  </a>
  {{/each}}
</div>

</script>
<script>
var stories = {
  data:[
    
{
    "title": "WNC high school sports: Wednesday night box scores",
    "date": "Thu, 14 Mar 2019 11:56:00 -0400",
    "storyLink": "https://www.citizen-times.com/story/sports/2019/03/14/wnc-high-school-sports-wednesday-night-box-scores/3158851002/",
    "description": "Wednesday night box scores",
    "imageLink": "https://www.gannett-cdn.com/media/2016/03/22/CarolinaGroup/Asheville/635942826390235826-RobersonVsNorthBunbaseball-014.jpg"
  },
  {
    "title": "Polk County Mitchell Yoder signs to play college football",
    "date": "Thu, 14 Mar 2019 11:52:10 -0400",
    "storyLink": "https://www.citizen-times.com/story/sports/high-school/hshuddle/2019/03/14/polk-countys-mitchell-yoder-signs-play-college-football/3161872002/",
    "description": "On Thursday, Yoder signed to play college football at Brevard College.",
    "imageLink": "https://www.gannett-cdn.com/presto/2018/10/13/PASH/0f67ea8a-823e-48a3-b4f6-9358b5299c24-yoder1.jpg"
  },
  {
    "title": "Reynolds senior rower signs with top college program",
    "date": "Wed, 13 Mar 2019 11:08:34 -0400",
    "storyLink": "https://www.citizen-times.com/story/sports/high-school/hshuddle/2019/03/13/reynolds-senior-rower-signs-top-college-program/3150304002/",
    "description": "Phoebe Haller, a senior at Reynolds High School and a rower with Asheville",
    "imageLink": "https://www.gannett-cdn.com/presto/2019/03/13/PASH/1631a68a-2088-4ee3-8af6-e2e9ca325242-womens4atnationals.jpg"
  },
  {
    "title": "WNC high school sports: Tuesday night box scores",
    "date": "Wed, 13 Mar 2019 11:05:18 -0400",
    "storyLink": "https://www.citizen-times.com/story/sports/2019/03/13/wnc-high-school-sports-tuesdaynight-box-scores/3147815002/",
    "description": "Results from Tuesday night",
    "imageLink": "https://www.gannett-cdn.com/media/2018/03/16/CarolinaGroup/Asheville/636568286147991388-Rosman-Murphy-023.JPG"
  },
  {
    "title": "Local baseball teams included in state poll",
    "date": "Tue, 12 Mar 2019 12:30:44 -0400",
    "storyLink": "https://www.citizen-times.com/story/sports/high-school/hshuddle/2019/03/12/local-baseball-teams-included-state-poll/3139218002/",
    "description": "For the third year, Prep Baseball Report of North Carolina is teaming up",
    "imageLink": "https://www.gannett-cdn.com/media/2018/05/04/CarolinaGroup/Asheville/636610712081564398-BSB-WHHS-vs-AHS-05042018-0423.jpg"
  },
  {
    "title": "WNC high school basketball: Western Highlands All-Conference Boys Team",
    "date": "Tue, 12 Mar 2019 10:48:01 -0400",
    "storyLink": "https://www.citizen-times.com/story/sports/high-school/hshuddle/2019/03/12/wnc-high-school-basketball-western-highlands-all-conference-boys-team/3139044002/",
    "description": "Western Highlands All-Conference Boys Team",
    "imageLink": "https://www.gannett-cdn.com/presto/2019/01/12/PASH/c5edd678-cd27-4e79-b5d1-28d01982ad33-BBKH_MHHS_vs_MHS_01112019_0463.jpg"
  },

]
};

var source = $("#stories").html();
var template = Handlebars.compile(source);
var output = template(stories);
document.getElementById("content").innerHTML = output;
</script>


font-family: 'UnifySans_W_Bd', "Helvetica Neue", Helvetica, Arial, sans-serif;
font-family: "UnifySans_W_Rg", "Helvetica Neue", Helvetica, Arial, sans-serif;