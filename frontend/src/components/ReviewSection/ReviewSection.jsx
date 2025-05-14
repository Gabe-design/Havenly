// frontend/src/components/Reviews/ReviewSection.jsx

// Importing tools
import { useSelector } from "react-redux";
// IMporting modal the triggers and components
import OpenModalButton from "../OpenModalButton";
import PostReviewModal from "../PostReviewModal/PostReviewModal";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
// The styles import
import "./ReviewSection.css"

// This will display the full review section on the details page
function ReviewSection({ spot }) {
    // To get the current user from the store 
    const user = useSelector(( state ) => state.session.user );
    // This is to get the reviews from the store
    const reviews = useSelector(( state ) => Object.values( state.reviews ));
    // To check if the user is the owner 
    const isOwner = user && spot.Owner?.id === user.id;
    // This is to check if the user has a review already
    const alreadyReviewed = user && reviews.some(( r) => r.userId === user.id || r.User?.id === user.id );
    // Now this is to see if the user con post a review
    const canReview = user && !isOwner && !alreadyReviewed;

    // Gets the average review count rating
    const avgRating = spot.avgRating;
    const reviewCount = reviews.length;

    return (
        <div className="review-section">
            {/*This is to display the star rating and review count*/}
            <div className="review-summary">
                <i className="fa fa-star"/>
                { avgRating ? avgRating.toFixed( 1 ) : "New" } 
                { reviewCount > 0 && (
                    <>
                    <span className="dot"> - </span>
                    <span>
                        { reviewCount } { reviewCount === 1 ? "Review" : "Reviews" }
                    </span>
                    </>
                )}
            </div>

            {/*Shows the post review button if user is allowed*/}
            { canReview && (
                <OpenModalButton
                buttonText={ "Post Your Review" }
                modalComponent={<PostReviewModal spotId={ spot.id } />}
                />
            )}

            {/*This is the be the first to post a review button*/}
            { reviewCount === 0 && canReview && (
                <p>Be the first to post a review!</p>
            )}

            {/*This will show the list of reviews*/}
            <div className="review-list">
                { reviews
                .slice()
                .sort(( a, b ) => new Date( b.createdAt ) - new Date( a.createdAt))
                .map(( review ) => (
                    <div key={ review.id } className="review-item">
                        <div className="review-header">
                            <strong> { review.User?.firstName }</strong>
                            <span>
                                { new  Date ( review.createdAt ).toLocaleDateString( undefined, {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <p> { review.review } </p>

                        {/*This will only show the delete button for users own review */}
                        {( user?.id === review.userId || user?.id === review.User?.id ) && (
                            <OpenModalButton
                            buttonText={ "Delete" }
                            modalComponent={ <DeleteReviewModal reviewId={ review.id } /> }
                            />
                        )}
                    </div>
                ))}
            </div>
            
        </div>
    )
}

// Export
export default ReviewSection;