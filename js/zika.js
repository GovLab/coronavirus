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
    
  data () {
  
    return {
      indexData: [],
      indexTextData: [],
      apiURL: 'https://directus.thegovlab.com/smarter-crowdsourcing',
    }
  },

  created: function created() {
    memberslug=window.location.pathname.split('/')[1];
    this.fetchIndex();
    this.fetchIndexText();
  },
  methods: {

    fetchIndex() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "smarter-crowdsourcing",
        storage: window.localStorage
      });

      client.getItems(
  'topics',
  {
    fields: ['*.*']
  }
).then(data => {
  console.log(data)
  self.indexData = data.data;
  // if (memberslug == 'en')
  // topic['page_en'] = true;
  // else
  // topic['page_en'] = false;
  console.log(memberslug);
  console.log(page_en);
  
})
.catch(error => console.error(error));
    },
    fetchIndexText() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "smarter-crowdsourcing",
        storage: window.localStorage
      });

      client.getItems(
  'homepage',
  {
    fields: ['*.*']
  }
).then(data => {
  console.log(data)
  self.indexTextData = data.data;
  
})
.catch(error => console.error(error));
    }
}
});

