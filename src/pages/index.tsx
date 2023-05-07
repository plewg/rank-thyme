import { useState } from "react";
import { PageContainer } from "~/components/PageContainer";

export default function Home() {
    const [password, setPassword] = useState("");
    const [pollName, setPollName] = useState("");

    return (
        <PageContainer>
            <div className="flex h-96 flex-col items-center gap-3">
                <label className="flex flex-col">
                    Poll Name:
                    <input
                        value={pollName}
                        onChange={(e) => {
                            setPollName(e.currentTarget.value);
                        }}
                        type="text"
                        className="my-1 h-8 w-56 rounded-md border-2 border-white bg-white p-1"
                    />
                </label>
                <label className="flex flex-col">
                    Password:
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.currentTarget.value);
                        }}
                        type="password"
                        className="my-1 h-8 w-56 rounded-md border-2 border-white bg-white p-1"
                    />
                </label>
                <button
                    type="submit"
                    className="my-8 h-9 w-28 rounded-md border-2 border-white bg-blue-300"
                    onClick={() => true}
                >
                    Create
                </button>
            </div>
        </PageContainer>
    );
}
