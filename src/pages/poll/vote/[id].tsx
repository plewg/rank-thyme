import type { Option } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { PageContainer } from "~/components/PageContainer";
import { api } from "~/utils/api";

export default function VotePage() {
    const id = useParam("id");

    if (!id) {
        return <LoadingSpinner />;
    }

    return <View id={id} />;
}

function View({ id }: { id: string }) {
    const [options, setOptions] = useState<Option[]>();
    const router = useRouter();
    const { data, isLoading } = api.poll.view.useQuery(
        { id },
        { onSuccess: (data) => setOptions(data.options) },
    );
    const { mutate } = api.poll.vote.useMutation({
        onSuccess: () => {
            localStorage.setItem(id, "true");
            void router.push(`/poll/results/${id}`);
        },
    });

    if (isLoading || !data || !options) {
        return <LoadingSpinner />;
    }

    const voted = Boolean(localStorage.getItem(id)?.length);

    return (
        <PageContainer>
            <div className="flex h-full w-56 flex-col items-center gap-3">
                <div>{data.name}</div>
                <ReactSortable
                    className="flex w-full flex-col gap-1"
                    list={options}
                    setList={setOptions}
                >
                    {options.map((option, i) => (
                        <div
                            key={option.id}
                            className="flex h-9 w-full flex-row items-center justify-center rounded-md border-2 border-slate-400 bg-amber-50 align-middle"
                        >
                            <span className="ml-1 flex-1">{i + 1}.</span>
                            <span className="">{option.body}</span>
                            <div className="flex-1" />
                        </div>
                    ))}
                </ReactSortable>
                {voted ? (
                    <Link
                        className="flex h-9 w-full flex-col items-center justify-center rounded-md border-2 border-white bg-blue-300 italic text-white focus:border-blue-500"
                        href={`/poll/results/${id}`}
                    >
                        <div>View Results</div>
                    </Link>
                ) : (
                    <button
                        type="submit"
                        className="h-9 w-full rounded-md border-2 border-white bg-blue-300 italic text-white focus:border-blue-500"
                        onClick={() => {
                            mutate({
                                id,
                                options: options.map(({ id }) => id),
                            });
                        }}
                    >
                        Vote
                    </button>
                )}
            </div>
        </PageContainer>
    );
}

function LoadingSpinner() {
    return <div>Loading</div>;
}

function useParam(param: string) {
    const router = useRouter();
    const value = router.query[param];
    return Array.isArray(value) ? value[0] : value;
}
