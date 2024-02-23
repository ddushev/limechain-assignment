import { BaseError,  } from "viem";
import { UseWaitForTransactionReceiptReturnType} from 'wagmi';
import cx from "classnames";

import styles from "./transactionStatus.module.scss"
import { WriteContractErrorType } from "wagmi/actions";

interface ITransactionStatusProps {
    hash: `0x${string}` | undefined,
    res: UseWaitForTransactionReceiptReturnType,
    error: WriteContractErrorType | null,
}

export default function TransactionStatus({hash, error, res}: ITransactionStatusProps) {
    return (
        <>
            {hash && <p><span className={styles.boldText}>Transaction hash:</span> {hash}</p>}
            {error && (
                <p className={styles.errorMsg}><span className={styles.boldText}>Error:</span> {(error as BaseError).shortMessage || error.message}</p>
            )}
            {res.isLoading && <p className={styles.boldText}>Hold one more sec, your transaction is getting validated</p>}
            {!res.isSuccess && <p className={cx(styles.boldText, styles.errorMsg)}>{res.error?.message}</p>}
        </>
    )
}