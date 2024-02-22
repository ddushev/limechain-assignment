import { useAccount, useConnect, useDisconnect } from 'wagmi'

import styles from "./Wallet.module.scss";

export default function Wallet() {
    const account = useAccount();
    const { disconnect } = useDisconnect();
    const { connectors, connect, status, error } = useConnect();

    return (
        <div className={styles.connectWalletContainer}>
            <div>
                <h2 className={styles.accountHeading}>Account</h2>
                <div className={styles.accountDetailsContainer}>
                    <p><span className={styles.boldText}>status:</span> {account.status}</p>
                    {account.addresses && <p><span className={styles.boldText}>addresses:</span> {JSON.stringify(account.addresses)}</p>}
                    {account.chainId && <p><span className={styles.boldText}>chainId:</span> {account.chainId}</p>}
                </div>
            </div>

            <div>
                <h2 className={styles.connectionHeading}>Connection</h2>
                <div className={styles.btnContainer}>
                {
                    account.status === "disconnected" && (
                        connectors.map((connector) => (
                            <button
                                className={styles.btn}
                                key={connector.uid}
                                onClick={() => connect({ connector })}
                                type="button"
                            >
                                Connect {connector.name}
                            </button>
                        ))
                    )
                }

                {
                    account.status === "connected" && (
                        <button type="button" onClick={() => disconnect()} className={styles.btn}>
                            Disconnect Wallet
                        </button>
                    )
                }
                </div>
                <p><span className={styles.boldText}>status:</span> {status}</p>
                {error && <p><span className={styles.boldText}>message:</span>{error.message}</p>}
            </div>
        </div>
    )
}
