// frontend/src/compenents/ManageReviewsPage/ManageReviewsPage.jsx

//Tools
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Links to edit or detail page 
// import { useNavigate } from "react-router-dom";
// This is the thunk to get current user spots
import { loadCurrentUserReviews } from "../../store/reviews";
import './ManageReviews.css'
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";

// To show the reviews owned by the current user
function ManageReviewsPage() {
    const dispatch = useDispatch();
    // const nav = useNavigate();
    const user = useSelector(( state ) => state.session.user );
    // This is to get the reviews from the store
    const reviews = useSelector(( state ) => Object.values( state.reviews ));

    // This will load the users spots
    useEffect(() => {
        if ( user ) dispatch( loadCurrentUserReviews());
    }, [ dispatch, user ]);

    // I also wnat it to show this loading state if nothing loaded yet
    if ( !reviews ) return <div>Loaing Reviews Please Wait...</div>;

    return (
        <section className="manage-reviews-container">
            <h1>Manage Reviews</h1>

            {/*Gonna add a message if there is not reviews*/}
            { reviews.length === 0 && (
                <div className="no-reviews-message">
                    <p>
                        You havent left any reviews yet.
                    </p>
                </div>
            )}

            {/*This will show the list of reviews*/}
            <div className="review-list">
                { reviews
                .slice()
                .sort(( a, b ) => new Date( b.createdAt ) - new Date( a.createdAt))
                .map(( review ) => (
                    <div key={ review.id } className="review-item">
                        {/*For the spot name*/}
                        <h2>{ review.Spot?.name }</h2>
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
                            <div className="review-action">
                                <OpenModalButton
                                buttonText={ "Update" }
                                modalComponent={ <UpdateReviewModal review={ review } /> }
                                />

                                <OpenModalButton
                                buttonText={ "Delete" }
                                modalComponent={ <DeleteReviewModal reviewId={ review.id } /> }
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )

}

// Export
export default ManageReviewsPage;