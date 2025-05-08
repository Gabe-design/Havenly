// frontend/src/components/DeleteSpotModals/DeleteSpotModals.jsx

// The tools 
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";
// Styles
import "./DeleteSpot.css"

// This will show the modal asking to delete spot
function DeleteSpotModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // This will run when the user does delete
    const handleDelete = async () => {
        await dispatch( deleteSpot( spotId));
        closeModal();
    };

    // This will run when the deletion gets canceled
    const handleCancel = () => closeModal();

    return (
        <section className="delete-spot-modal">
            <h1>Confirm Delete</h1>
            <p> Are you sure you want to remove this spot from Havenly?</p>

            {/*The cancel and confirm buttons*/}
            <div className="delete-buttons">
                <button onClick={ handleDelete } className="confirm-delete">
                    Yes ( Delete Spot )
                </button>
                <button onClick={ handleCancel } className="cancel-delete">
                    No ( Keep Spot )
                </button>
            </div>
        </section>
    )
}

// Export
export default DeleteSpotModal;