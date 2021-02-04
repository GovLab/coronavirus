////////////////////////////////////////
// reload page after Forward and back
///////////////////////////////////////

const TYPE_BACK_FORWARD = 2;

function isReloadedPage() {
  return performance.navigation.type === TYPE_BACK_FORWARD;
}

function main() {
  if (isReloadedPage()) {
    window.location.reload();
  }
}
main();

////////////////////////////////////////////////////////////
///// TEAM  API REQUEST ` `
////////////////////////////////////////////////////////////

Vue.use(VueMeta);

new Vue({

  el: '#home-page',

  data() {

    return {
      indexData: [],
      filterData: [],
      js_audience: [
        { code: '', name: 'All' },
        { code: 'audience_1', name: 'Private Sector' },
        { code: 'audience_2', name: 'Academia' },
        { code: 'audience_3', name: 'Civil Society' },
        { code: 'audience_4', name: 'Vulnerable Populations' },
        { code: 'audience_5', name: 'Healthcare Providers' },
        { code: 'audience_6', name: 'Essential Workers' },
        { code: 'audience_7', name: 'Government Workers' },
        { code: 'audience_8', name: 'Organized Civil Society' },
        { code: 'audience_9', name: 'Nonprofits' },
      ],
      js_type: [
        { code: '', name: 'All' },
        { code: 'area_1', name: 'Research' },
        { code: 'area_2', name: 'Policy/Legislative/Regulatory' },
        { code: 'area_3', name: 'Data' },
        { code: 'area_4', name: 'Technology/Innovation' },
        { code: 'area_5', name: 'Communications' },
        { code: 'area_6', name: 'Partnerships' },
        { code: 'area_7', name: 'Capacity Building' },
        { code: 'area_8', name: 'Vulnerable Populations' },
        { code: 'area_9', name: 'Procurement/Logistics' },
      ],
      js_timeline: [
        { code: '', name: 'All' },
        { code: 'timeline_1', name: '1-3 Months (immediate)' },
        { code: 'timeline_2', name: '3-6 Months (medium)' },
        { code: 'timeline_3', name: '6-12 Months (long)' },
        { code: 'timeline_4', name: '1+ years (structural change)' },
      ],
      js_topic: [
        { code: '', name: 'All' },
        { code: 'topic_1', name: 'Testing Strategy' },
        { code: 'topic_2', name: 'Contact Tracing' },
        { code: 'topic_3', name: 'Behavioral Science and COVID' },
        { code: 'topic_4', name: 'Supporting Marginalized and Vulnerable Populations' },
        { code: 'topic_5', name: 'Epidemiological monitoring and surveillance' },
        { code: 'topic_6', name: 'Mental health and emotional wellbeing' },
      ],
      sortBy: 'name',
    sortDirection: 'ASC',
      selectedProjectType: null,
      apiURL: 'https://directus.thegovlab.com/smarter-crowdsourcing',
    }
  },

  created: function created() {
    this.fetchStrategies();
  },
  methods: {

    fetchStrategies() {

      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "smarter-crowdsourcing",
        storage: window.localStorage
      });

      client.getItems(
        'strategies',
        {
          fields: ['*.*','strat_rec.recommendation_id.*','strat_topic.topics_id.translations.*']
        }
      ).then(data => {

        self.indexData = data.data;
   //Most recently added first
        self.indexData = self.indexData.sort(function(a, b){
            return (b.id > a.id) ? 1 : -1;});
        
        self.filterData = self.indexData;
      })
        .catch(error => console.error(error));
    },
    searchItems() {

      squery = document.getElementById('search-text').value;
      let searchData = self.indexData.filter(items => (items.description_en.toLowerCase().includes(squery.toLowerCase()) || items.description_pt.toLowerCase().includes(squery.toLowerCase()) ||items.description_es.toLowerCase().includes(squery.toLowerCase())));
      self.filterData = searchData;
    },
    ResetItems() {
      self.filterData = self.indexData;
      document.getElementById("filter-count").style.display = "none";
      document.getElementById("form-1").selectedIndex = 0;
      document.getElementById("form-2").selectedIndex = 0;
      document.getElementById("form-3").selectedIndex = 0;
      document.getElementById("form-4").selectedIndex = 0;
    },
    changeFilter(event) {

      document.getElementById("filter-count").style.display = "block";
      var element = document.body.querySelectorAll("select");
      this.selectedAudience = element[0].value;
      this.selectedType = element[1].value;
      this.selectedTopic = element[2].value;
      this.selectedTimeline = element[3].value;
      console.log(this.selectedTimeline);
      //Scope Filter
      if (this.selectedAudience == '')
        self.filtered_audience = self.indexData;
      else {
        console.log(self.indexData);
        let filtered_by_audience = self.indexData.filter(function (e) {
          return e.audience.some(aud_element => aud_element == self.selectedAudience);
        });
        self.filtered_audience = filtered_by_audience;
      }
      //Region Filter
      if (this.selectedType == '')
        self.filtered_type = self.filtered_audience;
      else {
        let filtered_by_type = self.filtered_audience.filter(function (e) {
          return e.area.some(reg_element => reg_element == self.selectedType);
        });
        self.filtered_type = filtered_by_type;
      }
      //Topic Area Filter
      if (this.selectedTopic == '')
        self.filtered_topic = self.filtered_type;
      else {
        let filtered_by_topic = self.filtered_type.filter(function (e) {
          return e.topic.some(are_element => are_element == self.selectedTopic);
        });
        self.filtered_topic = filtered_by_topic;
      }
      //Pandemic Filter
      if (this.selectedTimeline == '')
        self.filtered_timeline = self.filtered_topic;
      else {
        let filtered_by_timeline = self.filtered_topic.filter(function (e) {
          return e.timeline == self.selectedTimeline;
        });
        self.filtered_timeline = filtered_by_timeline;
      }
      self.filterData = self.filtered_timeline;
    }


  }
});


