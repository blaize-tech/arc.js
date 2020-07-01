import { Observable } from 'rxjs';
import { Arc } from './arc';
import { Web3Receipt } from './types';
export declare enum ITransactionState {
    Sending = 0,
    Sent = 1,
    Mined = 2
}
/**
 * A transaction update is a snapshot of the state of a transaction at a particular time.
 */
export interface ITransactionUpdate<T> {
    state: ITransactionState;
    transactionHash?: string;
    receipt?: object;
    /**
     *  number of confirmations
     */
    confirmations?: number;
    /**
     * Parsed return value from the method call
     * or contract address in the case of contract creation tx.
     */
    result?: T;
}
/**
 * An operation is a stream of transaction updates
 */
export interface IOperationObservable<T> extends Observable<T> {
    send: () => Promise<Web3Receipt>;
}
export declare type Operation<T> = IOperationObservable<ITransactionUpdate<T>>;
export declare type web3receipt = object;
export declare type transactionErrorHandler = (error: Error, transaction?: any, options?: {
    from?: string;
}) => Promise<Error> | Error;
/**
 *
 *  * send a transaction to the ethereumblockchain, and return a observable of ITransactionUpdatessend
 * for example:
 *  ```sendTransaction(.....).subscribe((txUpdate) => {
 *    if (txUpdate.state === 'sent' ) { notify("your transaction has been sent, waitin'for it to be mnied") }
 *    if (txUpdate.state === 'mined'} {
 *      notify("your transaction has been mined! It was confirmed ${txUpdate.confirmations} times"}
 *      // and we also ahve the txUpdate.receipt and the txUpdate.result to do stuff with
 *    }
 *  })```
 *
 * @export
 * @template T
 * @param {Arc} context An instance of Arc
 * @param {*} transaction A Web3 transaction object to send
 * @param {((receipt: web3receipt) => T | Promise<T>)} mapReceipt A function that takes the receipt of
 *  the transaction and returns an object
 * @param {((error: Error, transaction: any, options: { from?: string }) => Promise<Error> | Error)} [errorHandler]
 *  A function that takes an error, and either returns or throws a more informative Error
 *  if errorHander is not provided, a default error handler will throw any errors thrown by calling `transaction.call()`
 * @returns {Operation<T>}
 */
export declare function sendTransaction<T>(context: Arc, transaction: any, mapReceipt: (receipt: web3receipt) => T | Promise<T>, errorHandler?: transactionErrorHandler): Operation<T>;
export declare function toIOperationObservable<T>(observable: Observable<T>): IOperationObservable<T>;
