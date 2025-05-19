// frontend/src/components/LandingPage/LandingPage.jsx

// Tools from react
import { useEffect } from 'react';
// Redux state and dispatching actions
import { useSelector, useDispatch } from 'react-redux';
// For the spot thunk
import {fetchSpots } from '../../store/spots';
// To link the spot detail page
import { Link } from 'react-router-dom';
import { useState } from 'react';
// Styles 
import './LandingPage.css'

// This renders the homepage lsit
function LandingPage() {
    const dispatch = useDispatch();
    
    // Pulls all the spots
    const spots = useSelector( state => state.spots );
    // This makes object to an array
    const spotArr = spots ? Object.values( spots ) : [];
    console.log( "SPOT ARRAY:", spotArr);

    const [ tooltip, setToolTip ] = useState({
        text: '',
        x: 0,
        y: 0,
        visible: false
    });

    // load all spots
    useEffect(() => {
        dispatch( fetchSpots());

    }, [ dispatch ]);

    if ( !spotArr.length ) return <div>Loading Havens Please Wait...</div>;

    // This will render each spot as a tile
    return (
        <>
        <div className = "spot-list-container">
            { spotArr.map( spot => (
               // <Link key={ spot.id } to={ `/spots/${ spot.id }`} className="spot-tile" data-name={ spot.name }> */
                <Link
                key={ spot.id }
                to={ `/spots/${ spot.id }` }
                className='spot-tile'
                data-name={ spot.name }
                onMouseEnter={ ( e ) => setToolTip({
                    text: spot.name,
                    x: e.clientX,
                    y: e.clientY,
                    visible: true
                })}
                onMouseMove={ (e ) => setToolTip( prev => ({
                    ...prev,
                    x: e.clientX,
                    y: e.clientY,
                }))}
                onMouseLeave={ () => setToolTip( prev => ({
                    ...prev,
                    visible: false
                }))}

                >
                    {/*Changing the layout so it matches the wireframes checklist on the scorecard*/}

                    <div className='spot-img-wrapper'>
                        <img src={ spot.previewImage } alt={ spot.name }/>
                        <div className='spot-name-label'>{ spot.name }</div>
                    </div>
                    <div className='spot-tile-text'>
                        {/* Im keeping the spot name for personal design */}
                        <div className='spot-name' title={ spot.name }>
                             { spot.name }
                        </div>
                        {/*<div className='spot-location'> 
                            {spot.city}, { spot.state }
                        </div>
                        <div className='spot-name' title={ spot.name }>
                             { spot.name }
                        </div>*/}
                        <div className='spot-tile-bottom'>
                            <div className='left'>
                                <div className='spot-location'> 
                                    {spot.city}, { spot.state }
                                </div>
                                <div className='spot-price'>
                                    ${ spot.price } <span>night</span>
                                </div>
                            </div>
                            <div className='right'>
                                <div className='spot-rating'>
                                    <i className='fa-solid fa-star'/>
                                    { spot.avgRating ? ` ${spot.avgRating.toFixed(1)}` : ' New' }
                                </div>
                            </div>
                            {/*<div className='spot-rating'>
                                <i className='fa-solid fa-star'/>
                                { spot.avgRating ? ` ${spot.avgRating.toFixed(1)}` : ' New' }
                            </div>*/}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        { tooltip.visible && (
            <div 
            className='floating-tooltip'
            style={{ top: tooltip.y, left: tooltip.x }}
            >
            { tooltip.text }
            </div>
        )}
        </>
    )
}

// Export
export default LandingPage;