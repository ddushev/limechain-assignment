import { sepolia } from "wagmi/chains"
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CONTRACT from "../../constants/contract";
import PATHS from "../../constants/paths";

import styles from "./beerDetails.module.scss";
import TransactionStatus from "../../elements/transactionStatus/transactionStatus";


export default function BeerDetails() {
    const navigate = useNavigate();
    const [ratingStr, setRating] = useState("");
    const [beerNumberStr, setBeerNumber] = useState("");
    const [message, setMessage] = useState("");
    const [hash, setHash] = useState("");
    const { beerId } = useParams();
    const { data: transactionHash, error, writeContract } = useWriteContract();
    const rating = Number(ratingStr);
    const beerNumber = Number(beerNumberStr);
    useEffect(() => {
        setHash(transactionHash!);
    }, [transactionHash]);

    const res =
        useWaitForTransactionReceipt({
            hash: transactionHash,
        });

    useEffect(() => {
        return () => {
            setRating("");
            setHash("");
        }
    }, [res.isLoading]);
    const { data: numberOfBeersBigInt } = useReadContract({
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
        args: [BigInt(Number(beerId!) - 1)],
        chainId: sepolia.id,
    });
    const numberOfBeers = Number(numberOfBeersBigInt);
    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRating(event.target.value);
    }

    const handleBeerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBeerNumber(event.target.value);
    }

    const handleSendClick = () => {
        if (rating < 1 || rating > 5) {
            setMessage("Rating should be between 1 and 5 inclusive");
            return;
        }
        writeContract({
            abi: CONTRACT.ABI,
            address: `0x${CONTRACT.ADDRESS}`,
            functionName: "rateBeer",
            args: [BigInt(Number(beerId!) - 1), rating],
        })
        setMessage("");
    }

    const handleCheckBeer = () => {
        if (beerNumber < 1 || beerNumber > numberOfBeers) {
            setMessage("Invalid beer number");
            return;
        }
        navigate(`${PATHS.BEER_DETAILS}/${beerNumber}`);
        setBeerNumber("");
        setMessage("");
    }

    if (Number(beerId) >= numberOfBeers) {
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
                        <h2 className={styles.detailsHeading}>Details for beer number {Number(beerId)} of total {numberOfBeers - 1} beers in the smart contract</h2>
                        {beerDetails &&
                            <>
                                <div>
                                    <label htmlFor="beerNumber"><span className={styles.boldText}>Show Beer Number:</span> </label>
                                    <input className={styles.ratingInput}
                                        min={1}
                                        max={numberOfBeers}
                                        type="number"
                                        name="beerNumber"
                                        id="beerNumber"
                                        placeholder={`1 to ${numberOfBeers - 1}`}
                                        value={beerNumberStr}
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
                                        value={ratingStr}
                                        onChange={handleRatingChange} />
                                </div>
                                <button onClick={handleSendClick} className={styles.btn} type="button">Rate</button>
                                {message && <p className={styles.errorMsg}><span className={styles.boldText}>Invalid input:</span> {message}</p>}
                                <TransactionStatus hash={hash as `0x${string}`} res={res} error={error}/>
                            </>
                        }
                    </>
            }
        </div>
    )
}