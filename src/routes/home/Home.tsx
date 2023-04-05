import React, { useEffect, useState } from "react";
import { guiStore } from "../../state/guiStore";

export function Home() {
    const [kontant1, setKontant1] = useState<any>();
    const [kontant2, setKontant2] = useState<any>();
    const [cover, setCover] = useState<any>();
    const [terminal1, setTerminal1] = useState<any>();
    const [terminal2, setTerminal2] = useState<any>();
    const [terminal3, setTerminal3] = useState<any>();
    const [terminal4, setTerminal4] = useState<any>();
    const [total1, setTotal1] = useState<any>();
    const [total2, setTotal2] = useState<any>();


    useEffect(()=>{
     
        const terminals = (terminal1 || 0)+(terminal2 || 0)+(terminal3 || 0)+(terminal4 || 0)
        const newKontant1 = (kontant1 || 0) - ((cover || 0) + terminals)
        setTotal1(newKontant1 || undefined)

        const newKontant2 = (total2 || 0) - ((cover || 0) + terminals)
        setKontant2(newKontant2 || undefined)

    })


    return (
        <div className="flex text-base">
            <div className="flex flex-col flex-1  text">
                <div className="flex flex-1 flex-col">
                    <div className="p-1  text-gray-500 m-auto">Kontant</div>
                    <div className="flex-1 p-1 flex dark:text-gray-800">
                        <div className="flex-1 p-1 m-auto">
                            <input
                                onChange={(e) => setKontant1(e.target.value)}
                                value={kontant1 || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1 focus:border-dashed focus:border border-gray-800 text-right text-right"
                            />
                        </div>
                        <div className="flex-1 p-1 m-auto">
                            <input
                                value={kontant2 || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1 bg-gray-400 text-right"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="p-1  text-gray-500 m-auto">Cover</div>
                    <div className="flex-1 p-1 flex dark:text-gray-800">
                        <div className="flex-1 p-1 m-auto">
                            <input
                                onChange={(e) => setCover(e.currentTarget.valueAsNumber)}
                                value={cover || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1 focus:border-dashed focus:border border-gray-800 text-right"
                            />
                        </div>
                        <div className="flex-1 p-1 m-auto">
                            <input
                                value={cover || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1 bg-gray-400 text-right"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="p-1  text-gray-500 m-auto">Term 1</div>
                    <div className="flex-1 p-1 flex dark:text-gray-800">
                        <div className="flex-1 p-1 m-auto">
                            <input
                                onChange={(e) => setTerminal1(e.currentTarget.valueAsNumber)}
                                value={terminal1 || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1 focus:border-dashed focus:border border-gray-800 text-right"
                            />
                        </div>
                        <div className="flex-1 p-1 m-auto">
                            <input
                                value={terminal1 || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1 bg-gray-400 text-right"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="p-1  text-gray-500 m-auto">Term 2</div>
                    <div className="flex-1 p-1 flex dark:text-gray-800">
                        <div className="flex-1 p-1 m-auto">
                            <input
                                onChange={(e) => setTerminal2(e.currentTarget.valueAsNumber)}
                                value={terminal2 || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1 focus:border-dashed focus:border border-gray-800 text-right"
                            />
                        </div>
                        <div className="flex-1 p-1 m-auto">
                            <input
                                value={terminal2 || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1 bg-gray-400 text-right"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="p-1  text-gray-500 m-auto">Term 3</div>
                    <div className="flex-1 p-1 flex dark:text-gray-800">
                        <div className="flex-1 p-1 m-auto">
                            <input
                                onChange={(e) => setTerminal3(e.currentTarget.valueAsNumber)}
                                value={terminal3 || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1 focus:border-dashed focus:border border-gray-800 text-right"
                            />
                        </div>
                        <div className="flex-1 p-1 m-auto">
                            <input
                                value={terminal3 || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1 bg-gray-400 text-right"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="p-1  text-gray-500 m-auto">Term 4</div>
                    <div className="flex-1 p-1 flex dark:text-gray-800">
                        <div className="flex-1 p-1 m-auto">
                            <input
                                onChange={(e) => setTerminal4(e.currentTarget.valueAsNumber)}
                                value={terminal4 || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1 focus:border-dashed focus:border border-gray-800 text-right"
                            />
                        </div>
                        <div className="flex-1 p-1 m-auto">
                            <input
                                value={terminal4 || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1 bg-gray-400 text-right"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="p-1  text-gray-500 m-auto">Total</div>
                    <div className="flex-1 p-1 flex dark:text-gray-800">
                        <div className="flex-1 p-1 m-auto">
                            <input
                                value={total1 || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1  bg-gray-400 text-right"
                                readOnly
                            />
                        </div>
                        <div className="flex-1 p-1 m-auto">
                            <input
                                onChange={(e) => setTotal2(e.currentTarget.valueAsNumber)}
                                value={total2 || ""}
                                type="number"
                                onKeyDown={(event) => (event.key === "." ? false : true)}
                                className="outline-none focus:border=gray w-full p-1 focus:border-dashed focus:border border-gray-800 text-right"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
