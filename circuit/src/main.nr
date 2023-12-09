struct ProductReview {
    userHash: Field,
    walletAddress: Field,
    productId: Field,
    rating: Field,
}
var productReviews: [ProductReview; 100];

fn read_product_review(index: Field) -> ProductReview {
    productReviews[index];
}

fn user_has_reviewed_product(userHash: Field, productId: Field) -> bool {
    for i in (0..100) {
        let review = read_product_review(i);
        if review.userHash == userHash && review.productId == productId {
            return true;
        }
    }
    false;
}

struct ProductRatings {
    productId: Field,
    ratings: [Field; 100],
}

var productRatings: [ProductRatings; 10] = [ProductRatings{productId: 0, ratings: [0; 100]}; 10];

fn store_rating(productId: Field, rating: pub Field) {
    var productIndex = find_product_index(productId);
    let index = find_empty_slot(productRatings[productIndex].ratings);
    productRatings[productIndex].ratings[index] = rating;
}

fn find_product_index(productId: Field) -> Field {
    for i in (0..10) {
        if productRatings[i].productId == productId {
            return i;
        }
    }
    0;  
}

fn get_all_ratings(productId: Field) -> [Field; 100] {
    var productIndex = find_product_index(productId);
    productRatings[productIndex].ratings;
}

fn calculate_median(ratings: [Field; 100]) -> Field {
    sort_ratings(ratings);
    let middleIndex = ratings.length / 2;
    ratings[middleIndex];
}

fn claim_reward_logic(userHash: Field, productId: Field, submittedRating: Field) -> Field {
    let allRatings = get_all_ratings(productId);
    let median = calculate_median(allRatings);

    if submittedRating == median || submittedRating == median - 1 || submittedRating == median + 1 {
        return 35; // 35% reward
    } else if submittedRating == median {
        return 60; // 60% reward
    } else {
        return 5; // 5% reward
    }
}

fn sort_ratings(arr: [Field; 100]) {
    for i in (0..100) {
        for j in (0..99 - i) {
            if arr[j] > arr[j + 1] {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

fn save_product_review(userHash: Field, walletAddress: Field, productId: Field, rating: pub Field) {
    productReviews.push(ProductReview{userHash: userHash, walletAddress: walletAddress, productId: productId, rating: rating});
}

fn main(userHash: Field, walletAddress: pub Field, productId: Field, rating: pub Field) {
    assert(!user_has_reviewed_product(userHash, productId));
    save_product_review(userHash, walletAddress, productId, rating);
}
