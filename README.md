# Review-pulse

## PROBLEM
User reviews are integral to the success and trustworthiness of both web2 and web3 products. Suppose you wish to buy a new mobile phone, wanna buy tickets for a new movie or wanna order a pizza from dominos, the first thing you look on as a user to the service is the customer reviews or ratings. Consider the following 2 products which one would you want to buy?

Product A with low price and low customer ratings or Product B with high price but good customer ratings.

Obviously, the second product will be more preferred despite the high price because of the assurance it provides. This is what the value of a review can be in the sale of a product and improvement of a service. On one side, the reviews add value to a product but there is no incentive for a user to add reviews. The problem revolves around the lack of sufficient incentives for users to provide honest and valuable reviews for products and services. Without proper motivation, users may not actively engage in the review process, leading to an incomplete or biased representation of the quality of products or services. Moreover, the absence of consequences for malicious reviews may undermine the trustworthiness of the entire review system.

**Challenges:**
- Limited User Participation: Users may be reluctant to spend time and effort in writing reviews without a clear incentive or benefit.
- Potential for Biased Reviews: Without proper checks and balances, there is a risk of receiving biased or fake reviews, which can mislead potential consumers.
- Trust Issues: Users might be skeptical about the authenticity of reviews, affecting their trust in the review system.
If there is some incentive for the user to provide honest reviews and punishments for the malicious providers, the review system can be more trustworthy and can add more value towards the improvement of the services.


## SOLUTION

If we see the example of the Brave browser, how a decentralized ad-blocking service gained the traction of entire world by rewarding users for ad-blocks. This was when majority of people even came to know about blockchain technologies and the inherent workings and approaches,a step towards mass-adoption of web3 with a social goodness. We aim to solve the problem with a similar mindset for a mass adoption of blockchain technologies and consumer good, adding value to blockchain assets and technologies. 
Our approach incentivizes the users to provide reviews in a risk-and-reward model. The algorithm favors the true reviewers while punishing the malicious ones. The key focus areas of the model are:
- Preventing sybil attacks: with the use of ANON AADHAR for single user login and proof of personhood and citizenship. This ensures resistance to sybil attacks, allowing only one review per purchase by a person.
- Reward mechanism:
  - If we reward the users based on the majority, it might be a case that the users form a subgroup within themeselves to gain the maximum incentives. To prevent this, there would be several factors affecting the incentive model: users will be rewarded based on the risk they are taking (by reviewing first, or staking larger) and the consensus of the reviewers overall.
  - Now, the reviewers who are reviewing first take the maximum risk and must be rewarded the most and so likewise, however the future users may want to replicate the patterns in the review data sets provided previously. This may lead to malicious reviews. To overcome this we perform the incentive disbursal in rounds. Each round gets completed once a certain threshold of users has provided a review. 
  - The main point to note is that for a round the ratings and review provided by other users is completely hidden, however the users can still see the slight analysis of the product (safe or not) along with the descriptions of the previousreviewers, to decide whether or not to buys the product which will be determining the sale of the product.
  - Once a round is over the incentives for that round are available to be claimed, however to ensure the user taking the maximum risk is rewarded the most, the percentage of the pool rewards decreases with increasing rounds.
  - To ensure the protocol mechanics works as intended, there is a DAO of the highest reputated reviewers, currently declared on the basis of the Proof of Purchase NFTs with the users (not the best approach as of now but for actual product we can use game theory and reputation attestation for these tasks).
    ![di1 drawio](https://github.com/Richa-iitr/Review-pulse/assets/76250660/0ccbd8d1-f020-40a3-b653-bf644fac5ddd)



### Product Listing
A registered user (registered via anon aadhar) can list the product on the UI. The seller also transfers a pool of native tokens to the Universal smart contract, this serves as the reward system for the reviewers. The product listing involves description of the product, seller, images, and other relevant details. The sellers can be individual verified retail sellers or ecommerce sites like Amazon itself. 

### User Enrollment
Whenever a user signs up the platform, he provides his anon aadhar, this is used as a sybil-resistant proof of humanhood which ensures each user has only one profile to review with and the user doesn't maliciously bias the system. At the time of enrollment the user is also airdropped with 10000 RVT points which are the points used for staking during reviewing. A user can provide any amount of stake (minimum cap decided by the DAO), based on the staked amount, the time user reviewed an entity and the rating significance, the incentives of the user are decided. The naive algorithm for this is discussed later, however several game theory models can be used later.

### Product Purchase and Review
Whenver a user needs to purchase a product he goes to the product listing page and based on the exisiting reviews plans on whether or not to buy a particular product. If he buys the product he gets a Proof of Purchase NFT which works as an attestation of "verified buyer". As of now, however we only allow verified users or NFT holders to make reviews in future both verified and unverified may provide the reviews however analysis will be based on verified only (as per the DAO). Once the user is attested as a verified buyer and a valid aadhar holder, he can write reviews. The Proof Of Purchase NFTs can be used to develop a reputation system of the user. 

### Claim of rewards
After the threshold of reviews decided by the DAO has reached, the claim button activates for the user and he can claim his awards along with restoring the RVT points. The highest NFT holders and incentives receivers can be the members of the DAO, who take decisions around the incentive distribution, thresholds decisions, sellers onboarding, revenue mechanisms etc. 

### ALGORITHM [NAIVE]
* This is a naive algorithm for rewards distribution which could be thought of and implemented the day we thought about it. Improvements to this can be done using game theory.
The algorithm calculates the revenue based on following:
- Time of review provision
- Stake deposited
- Relevance of review

To deal with the problems associated with copying of previous trends we will use ZK Proofs for keeping the users reviews into a black box however verifying and incentivising them again. The model looks like - there are multiple rounds for token distribution. Let's say the governance DAO decides the number of reviews in each round as 'k', then there will be n/k rounds eligible for incentives where n is the number of developers at a certain time. Now the initial rounds are the ones with the maximum risk as there are no many examples or hints to learn from. So the people reviewing in the initial rounds will share a larger portion of the rewards from the pool. The people staking more are again putting more confidence and hence will share a larger share and the people falling in the majority are again the ones who should be rewarded. The governance decides on a weight system for these three categories. based on those weights the rewards are distributed at the end of the round. Also, no user can see the other reviews of a round. This ensures no intentional malicious behavior occurs and hence extra checks like slashing may not be required at this time. However , the user can see the analysis or the safe slider of the previous rounds and also the anonymous description of the reviews not the exact rating. This ensures safe purchase and trusted reviews. 

**Example run:**


## FUTURE WORKS
- With the collaboration of service providers like e-commerce websites or sellers, we can get more better information regarding the products available, verified purchases or returns.
- These incentives can include discounts, loyalty points, or other tangible benefits also.
- Formalizing in detail the game theory algorithms for incentive mechanisms.
- Expanding the aim from web2 web3 products and services to other services like tourism, airlines, consumer forums etc.
 https://github.com/Richa-iitr/Review-pulse-subgraph
