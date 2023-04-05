import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React from "react";

// just for fun.. looks like a lot want this type of component
// used this and wrapped it in own component
// made small adjustments to fit datatype and colors
// https://headlessui.com/react/combobox

type item = { label: string; id: string };

export function ComboboxComp(props: {
    selected: null | item;
    label: string;
    list: item[];
    callback: (id: item | null) => void;
}) {
    const [selected, setSelected] = useState(props.selected);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (selected !== props.selected) {
            setSelected(props.selected);
        }
    }, [props.selected]);

    const filteredList =
        query === ""
            ? props.list
            : props.list.filter((item) =>
                  item.label
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    return (
        <Combobox
            value={selected || props.selected}
            onChange={(item) => {
                props.callback(item);
                setSelected(item);
            }}
        >
            <Combobox.Label>{props.label}</Combobox.Label>
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden  bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none "
                        displayValue={(item: any) => item?.label}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-indigo-600 dark:text-blue-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredList.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredList.map((item) => (
                                <Combobox.Option
                                    key={item.id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-indigo-600 dark:bg-blue-400 text-white"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={item}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected ? "font-medium" : "font-normal"
                                                }`}
                                            >
                                                {item.label}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active ? "text-white" : "text-teal-600"
                                                    }`}
                                                >
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
}
