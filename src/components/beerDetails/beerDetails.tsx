import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sepolia } from "wagmi/chains"
import { useReadContract, useWriteContract } from 'wagmi';

import CONTRACT from "../../constants/contract";

import styles from "./beerDetails.module.scss";
import { BaseError } from "viem";
import PATHS from "../../constants/paths";


export default function BeerDetails() {
    const navigate = useNavigate();
    const [rating, setRating] = useState("");
    const [beerNumber, setBeerNumber] = useState("");
    const [message, setMessage] = useState("");
    const { data: hash, error, writeContract } = useWriteContract();
    const { beerId } = useParams();
    const { data: numberOfBeers } = useReadContract({
        abi: CONTRACT.ABI,
        address: `0x${CONTRACT.ADDRESS}`,
        args: [],
        functionName: 'getBeerCount',
        chainId: sepolia.id,
    });
    const { data: beerDetails, isLoading } = useReadContract({
        abi: CONTRACT.ABI,
        address: `0x${CONTRACT.ADDRESS}`,
        functionName: 'getBeer',
        args: [BigInt(beerId!)],
        chainId: sepolia.id,
    });

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRating(event.target.value);
    }

    const handleBeerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBeerNumber(event.target.value);
    }

    const handleSendClick = () => {
        if (Number(rating) < 1 || Number(rating) > 5) {
            setMessage("Rating should be between 1 and 5 inclusive");
            return;
        }
        writeContract({
            abi: CONTRACT.ABI,
            address: `0x${CONTRACT.ADDRESS}`,
            functionName: "rateBeer",
            args: [BigInt(beerId!), Number(rating)],
        })
        setMessage("");
    }

    const handleCheckBeer = () => {
        navigate(`${PATHS.BEER_DETAILS}/${Number(beerNumber) - 1}`);
        setBeerNumber("");
    }

    if (Number(beerId) >= Number(numberOfBeers)) {
        return (
            <div className={styles.detailsContainer}>
                <h2 className={styles.detailsHeading}>The is no such beer in the smart contract</h2>
            </div >
        )
    }

    return (
        <div className={styles.detailsContainer}>
            {
                isLoading ?
                    <h2 className={styles.detailsHeading}>Loading...</h2>
                    :
                    <>
                        <h2 className={styles.detailsHeading}>Details for beer number {Number(beerId) + 1} of total {Number(numberOfBeers)} beers in the smart contract</h2>
                        {beerDetails &&
                            <>
                                <div>
                                    <label htmlFor="beerNumber"><span className={styles.boldText}>Check Beer Number:</span> </label>
                                    <input className={styles.ratingInput}
                                        min={0}
                                        max={Number(numberOfBeers)}
                                        type="number"
                                        name="beerNumber"
                                        id="beerNumber"
                                        placeholder={`0 to ${Number(numberOfBeers)}`}
                                        value={beerNumber}
                                        onChange={handleBeerChange} />
                                </div>
                                <button onClick={handleCheckBeer} className={styles.btn} type="button">Check Beer</button>
                                <p><span className={styles.boldText}>Beer Name:</span> {beerDetails[0]}</p>
                                <img className={styles.beerImg} src={beerDetails[1]} alt="beer-img" />
                                <p><span className={styles.boldText}>Brewery:</span> {beerDetails[2]}</p>
                                <p><span className={styles.boldText}>Alcohol:</span> {beerDetails[3]}%</p>
                                <p><span className={styles.boldText}>Beer Type:</span> {beerDetails[4]}</p>
                                <p><span className={styles.boldText}>Price:</span> ${Number(beerDetails[5])}</p>
                                <p><span className={styles.boldText}>Average Rating:</span> {Number(beerDetails[6])}</p>
                                <div>
                                    <label htmlFor="ratingInput"><span className={styles.boldText}>Your Rating:</span> </label>
                                    <input className={styles.ratingInput}
                                        min={1}
                                        max={5}
                                        type="number"
                                        name="ratingInput"
                                        id="ratingInput"
                                        placeholder="1 to 5"
                                        value={rating}
                                        onChange={handleRatingChange} />
                                </div>
                                <button onClick={handleSendClick} className={styles.btn} type="button">Rate</button>
                                {hash && <p><span className={styles.boldText}>Transaction hash:</span> {hash}</p>}
                                {message && <p><span className={styles.boldText}>Invalid input:</span> {message}</p>}
                                {error && (
                                    <p><span className={styles.boldText}>Error:</span> {(error as BaseError).shortMessage || error.message}</p>
                                )}
                            </>
                        }
                    </>
            }
        </div>
    )
}