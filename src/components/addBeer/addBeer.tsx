import { sepolia } from "viem/chains";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { BaseError } from "viem";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../hooks/useForm";
import BEER_FORM_FIELDS from "../../constants/formFields";
import CONTRACT from "../../constants/contract";

import styles from "./addBeer.module.scss";
import PATHS from "../../constants/paths";

export default function AddBeer() {
    const navigate = useNavigate();
    const { data: numberOfBeers } = useReadContract({
        abi: CONTRACT.ABI,
        address: `0x${CONTRACT.ADDRESS}`,
        args: [],
        functionName: 'getBeerCount',
        chainId: sepolia.id,
    });
    const { data: hash, error, writeContract } = useWriteContract();
    const res =
        useWaitForTransactionReceipt({
            hash,
        });
    useEffect(() => {
        if (res.isSuccess) {
            navigate(`${PATHS.BEER_DETAILS}/${Number(numberOfBeers)}`)
        }
    }, [res]);
    const { values, onChangeHandler } = useForm({
        [BEER_FORM_FIELDS.BEER_NAME]: '',
        [BEER_FORM_FIELDS.IMG_URL]: '',
        [BEER_FORM_FIELDS.BREWERY]: '',
        [BEER_FORM_FIELDS.ALCOHOL]: '',
        [BEER_FORM_FIELDS.BEER_TYPE]: '',
        [BEER_FORM_FIELDS.PRICE]: '',
    });
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        writeContract({
            abi: CONTRACT.ABI,
            address: `0x${CONTRACT.ADDRESS}`,
            functionName: "addBeer",
            args: [
                values[BEER_FORM_FIELDS.BEER_NAME],
                values[BEER_FORM_FIELDS.IMG_URL],
                values[BEER_FORM_FIELDS.BREWERY],
                Number(values[BEER_FORM_FIELDS.ALCOHOL]),
                values[BEER_FORM_FIELDS.BEER_TYPE],
                Number(values[BEER_FORM_FIELDS.PRICE]),
            ],
        });
    }
    return (
        <div className={styles.addBeerContainer}>
            <h2 className={styles.addBeerHeading}>Add Beer</h2>

            <form className={styles.addBeerForm} onSubmit={handleFormSubmit}>
                <div className={styles.inputContainer}>
                    <label className={styles.label} htmlFor={BEER_FORM_FIELDS.BEER_NAME}>Beer Name:</label>
                    <input
                        required
                        className={styles.input}
                        type="text" placeholder="Stella Artois"
                        name={BEER_FORM_FIELDS.BEER_NAME}
                        id={BEER_FORM_FIELDS.BEER_NAME}
                        value={values[BEER_FORM_FIELDS.BEER_NAME]}
                        onChange={onChangeHandler} />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label} htmlFor={BEER_FORM_FIELDS.IMG_URL}>Image URL:</label>
                    <input
                        required
                        className={styles.input}
                        type="text" placeholder="https://stella-artois.jpg"
                        name={BEER_FORM_FIELDS.IMG_URL}
                        id={BEER_FORM_FIELDS.IMG_URL}
                        value={values[BEER_FORM_FIELDS.IMG_URL]}
                        onChange={onChangeHandler} />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label} htmlFor={BEER_FORM_FIELDS.BREWERY}>Brewery:</label>
                    <input
                        required
                        className={styles.input}
                        type="text" placeholder="Stella Artois Brewery"
                        name={BEER_FORM_FIELDS.BREWERY}
                        id={BEER_FORM_FIELDS.BREWERY}
                        value={values[BEER_FORM_FIELDS.BREWERY]}
                        onChange={onChangeHandler} />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label} htmlFor={BEER_FORM_FIELDS.ALCOHOL}>Alcohol %:</label>
                    <input
                        required
                        min={0}
                        className={styles.input}
                        type="number" placeholder="5"
                        name={BEER_FORM_FIELDS.ALCOHOL}
                        id={BEER_FORM_FIELDS.ALCOHOL}
                        value={values[BEER_FORM_FIELDS.ALCOHOL]}
                        onChange={onChangeHandler} />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label} htmlFor={BEER_FORM_FIELDS.BEER_TYPE}>Beer Type:</label>
                    <input
                        required
                        className={styles.input}
                        type="text" placeholder="Pale Lager"
                        name={BEER_FORM_FIELDS.BEER_TYPE}
                        id={BEER_FORM_FIELDS.BEER_TYPE}
                        value={values[BEER_FORM_FIELDS.BEER_TYPE]}
                        onChange={onChangeHandler} />
                </div>

                <div className={styles.inputContainer}>
                    <label className={styles.label} htmlFor={BEER_FORM_FIELDS.PRICE}>Price $:</label>
                    <input
                        required
                        min={1}
                        className={styles.input}
                        type="number" placeholder="3"
                        name={BEER_FORM_FIELDS.PRICE}
                        id={BEER_FORM_FIELDS.PRICE}
                        value={values[BEER_FORM_FIELDS.PRICE]}
                        onChange={onChangeHandler} />
                </div>

                <button type="submit" className={styles.addBtn}>Add beer</button>
            </form>

            {hash && <p><span className={styles.boldText}>Transaction hash:</span> {hash}</p>}

            {error && (
                <p><span className={styles.boldText}>Error:</span> {(error as BaseError).shortMessage || error.message}</p>
            )}
            {res.isLoading && <p className={styles.boldText}>Hold one more sec, your transaction is getting validated</p>}
            {!res.isSuccess && <p className={styles.boldText}>{res.error?.message}</p>}
        </div>
    )
}