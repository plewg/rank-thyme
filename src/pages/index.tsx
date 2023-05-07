import { useState } from "react";
import type { ItemInterface } from "react-sortablejs";
import { ReactSortable } from "react-sortablejs";
import { PageContainer } from "~/components/PageContainer";

interface ItemType extends ItemInterface {
    name: string;
}

export default function Home() {
    const [password, setPassword] = useState("");
    const [pollName, setPollName] = useState("");
    const [newOption, setNewOption] = useState("");
    const [options, setOptions] = useState<ItemType[]>([]);

    return (
        <PageContainer>
            <div className="flex h-full flex-col items-center gap-3">
                <button
                    type="submit"
                    className="h-9 w-56 rounded-md border-2 border-white bg-blue-300 italic text-white focus:border-blue-500"
                    onClick={() => true}
                >
                    Create
                </button>
                <label className="flex flex-col">
                    Poll Name:
                    <input
                        value={pollName}
                        onChange={(e) => setPollName(e.currentTarget.value)}
                        type="text"
                        className="my-1 h-8 w-56 rounded-md border-2 border-blue-300 bg-white p-1"
                    />
                </label>
                <label className="flex flex-col">
                    Password:
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        type="password"
                        className="my-1 h-8 w-56 rounded-md border-2 border-blue-300 bg-white p-1"
                    />
                </label>
                <form
                    onSubmit={(e) => {
                        const alreadyExists = options
                            .map(({ id }) => id)
                            .includes(newOption);

                        if (!alreadyExists) {
                            setOptions([
                                ...options,
                                { id: newOption, name: newOption },
                            ]);
                        }
                        setNewOption("");
                        e.preventDefault();
                    }}
                >
                    <label className="flex flex-col">
                        Add option (enter to add):
                        <input
                            value={newOption}
                            onChange={(e) =>
                                setNewOption(e.currentTarget.value)
                            }
                            type="text"
                            className="my-1 h-8 w-56 rounded-md border-2 border-blue-300 bg-white p-1"
                        />
                    </label>
                </form>

                <ReactSortable list={options} setList={setOptions}>
                    <div className="flex flex-col gap-1">
                        {options.map((option) => (
                            <button
                                className="h-9 w-56 rounded-md border-2 border-white bg-blue-300 italic text-white"
                                type="button"
                                onClick={() =>
                                    setOptions(
                                        options.filter(
                                            ({ id }) => id !== option.id,
                                        ),
                                    )
                                }
                                key={option.id}
                            >
                                {option.name}
                            </button>
                        ))}
                    </div>
                </ReactSortable>
                {options.length > 0 && <span>(click an option to remove)</span>}
            </div>
        </PageContainer>
    );
}
