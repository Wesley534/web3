import React, { useContext} from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import { Transaction } from "ethers";
import useFetch from "../hooks/useFetch";

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
    const gifUrl = useFetch({ keyword });
    return (
        <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] min-w-[210px] flex-col p-3 rounded-md hover:shadow-2xl ">
            <div className="flex flex-col items-center w-full mt-3">
                <div className=" w-full mb-6 p-2">
                    {/* <a href={`https://rinkeby.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                    // </a>  keep this link for when you deploy to a mainnet*/}  
                    <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
                    <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
                    <p className="text-white text-base">Amount: {amount} ETH</p>
                    {message && (
                        <>
                            <br />
                            <p className="text-white text-base">Message: {message}</p>
                        </>
                    )}

                    <img 
                    src="{gifUrl | url}"
                    alt="gif"
                    className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"
                    />

                    <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                        <p className="text-[#37c7da] font-bold ">{timestamp}</p>


                    </div>


                    </div>


            </div>
        </div>
    )
}

const Transactions =() => {
    const { currentAccount, transactions } = useContext(TransactionContext);
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-center">Latest Transactions</h1>
                ) : (
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-center">Connect your account to see the latest transactions</h1>
                )}
                <div className="flex flex-wrap justify-center items-center mt-10">
                    {transactions.reverse().map((transaction, i) =>(
                        <TransactionCard key={i} {...transaction}/>
                    ))}

                </div>
                
                </div>
            </div>
    
        
    );
}
export default Transactions;