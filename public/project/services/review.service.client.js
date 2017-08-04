(function() {

    angular
        .module("omdbApp")
        .service("reviewService", reviewService);


    function reviewService($http) {

        // var reviews = [
        //     { "_id": "321", "name": "Post 1", "userId": "456", "description": "Lorem" },
        //     { "_id": "432", "name": "Post 2", "userId": "456", "description": "Lorem" },
        //     { "_id": "543", "name": "Post 3", "userId": "456", "description": "Lorem" }
        // ];
        
        this.findReviewByUserId = findReviewByUserId;
        this.createReview = createReview;
        this.findReviewById = findReviewById;
        this.updateReview = updateReview;
        this.deleteReview = deleteReview;


        // Deletes an existing review
        function deleteReview(reviewId) {

            var url = "/api/review/" + reviewId;
            return $http.delete(url);

            // for(var p in reviews) {
            //     if(reviews[p]._id === id) {
            //         reviews.splice(p, 1);
            //     }
            // }
        }

        // Updates details of an an existing review
        function updateReview(reviewId, review) {

            var url = "/api/review/" + reviewId;

            return $http.put(url, review);

            // for(var p in reviews) {
            //     if(reviews[p]._id === id) {
            //         reviews[p] = review;
            //     }
            // }
        }

        // Finds a review requested by user by Id
        function findReviewById(reviewId) {

            var url = "/api/review/" + reviewId;
            return $http.get(url);

            // for(var p in reviews) {
            //     if(reviews[p]._id === reviewId) {
            //         return reviews[p];
            //     }
            // }
        }

        // Finds the list of reviews in a user of a user
        function findReviewByUserId(userId) {
            var url = '/api/user/' + userId + '/review';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

            // var review = [];
            //
            // for(var p in reviews) {
            //     if(reviews[p].userId === siteId) {
            //         review.push(reviews[p]);
            //     }
            // }
            // return review;

        }

        // Creates a new review
        function createReview(userId, review) {

            var url = '/api/user/' + userId + '/review';
            return $http.post(url, review);

            // review.userId = userId;
            // review._id = (new Date()).getTime() + "";
            // reviews.push(review);
        }



    }


})();