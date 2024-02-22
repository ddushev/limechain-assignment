import { useParams } from "react-router-dom";
import { sepolia } from "wagmi/chains"
import { useReadContract } from 'wagmi';

import CONTRACT from "../../constants/contract";

import styles from "./beerDetails.module.scss";


export default function BeerDetails() {
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
                        <h2 className={styles.detailsHeading}>Details for beer number {beerId} of total {Number(numberOfBeers)} beers in the smart contract</h2>
                        {beerDetails &&
                            <>
                                <p><span className={styles.boldText}>Beer Name:</span> {beerDetails[0]}</p>
                                <img className={styles.beerImg} src={beerDetails[1]} alt="beer-img" />
                                <p><span className={styles.boldText}>Brewery:</span> {beerDetails[2]}</p>
                                <p><span className={styles.boldText}>Alcohol:</span> {beerDetails[3]}%</p>
                                <p><span className={styles.boldText}>Beer Type:</span> {beerDetails[4]}</p>
                                <p><span className={styles.boldText}>Price:</span> ${Number(beerDetails[5])}</p>
                                <p><span className={styles.boldText}>Average Rating:</span> {Number(beerDetails[6])}</p>
                            </>
                        }
                    </>
            }
        </div>
    )
}