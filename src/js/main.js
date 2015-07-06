angular
	.module('stealadate', ['ui.router', 'ui.bootstrap', 'firebase'])
	
	.constant('FIRE_URL', 'https://stealadate.firebaseio.com/')

	.config(function ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when('','/');
    // $urlRouterProvider.otherwise('/');
    $stateProvider
      	.state('start', {
          url: '/',
        	templateUrl: 'index.html'
      	})

      	.state('newBundle', {
          url: '/newbundle',
          templateUrl: "assets/newbundle.html",
          controller: "newBundle",
          controllerAs: "newBundle"
      	})

      	.state('sectionDash', {
          abstract: true,
          url: '/bundle/{bKey}',
          templateUrl: 'assets/sectiondash.html'
      	})

        .state('sectionDash.newSection' , {
          url: '',
          templateUrl: 'assets/newsection.html',
          controller: "newSection",
          controllerAs: 'newSection'
        })

  	})

  	.factory('Fire', function (FIRE_URL) {
  		return {
  			newBun (data) {
	  				var fb = new Firebase(FIRE_URL);
	  				var ref = fb
	  				.child('bundle')
	  				.push({
	  					bun_title: data
	  				});
	  				this.bKey = ref.key()
  			},

  			newSec (location, data) {
  				var fb = new Firebase(FIRE_URL + location);
					var ref = fb
					.child('content')
					.push({
						section_title: data
					});
					this.sKey = ref.key()
  			},

  			bunName(location, cb) {
  				var fb = new Firebase(FIRE_URL + location)
  				fb
          .limitToFirst(1)
          .once("value", cb) 
  			},

        bunDash(cb){
          var fb = new Firebase(FIRE_URL + 'bundle')
          fb
          .once("value", cb) 
        },

  			secName(location, cb) {
  				var fb = new Firebase(FIRE_URL + location + '/content')
  					fb
  					.orderByChild('section_title')
  					.on("value", cb) 
  			},

  			newCont (location, sectionId, dataURL, dataTitle) {
  				var fb = new Firebase(FIRE_URL + location + '/content/' + sectionId);
				  var ref = fb
					.child('context')
					.push({
						content_title: dataURL,
						content_URL: dataTitle
					});
					this.buid = ref.key()
  			},

        updateBunName (id, newName) {
          var fb = new Firebase(FIRE_URL + '/bundle/' + id)
            fb
            .update({
              bun_title: newName
            });
        },

        updateSecName (location, id, newName) {
          var fb = new Firebase(FIRE_URL + location + '/content/' + id)
            fb
            .update({
              section_title: newName
            })
        }

        }
  	});


//-END