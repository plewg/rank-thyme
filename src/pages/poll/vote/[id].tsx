import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Option } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { LoadingSpinner } from "~/components/atoms/LoadingSpinner";
import { PageContainer } from "~/components/PageContainer";
import { api } from "~/utils/api";

export default function VotePage() {
    const id = useParam("id");

    return (
        <PageContainer>
            {id ? <View id={id} /> : <LoadingSpinner />}
        </PageContainer>
    );
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
                        className="flex h-9 w-full cursor-grab flex-row items-center justify-between rounded-md border-2 border-slate-400 bg-amber-50"
                    >
                        <span className="ml-1 flex-1 ">{i + 1}.</span>
                        <span>{option.body}</span>
                        <span className="mr-1 flex-1 text-right">
                            <FontAwesomeIcon
                                className="text-slate-400"
                                icon={faBars}
                            />
                        </span>
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
    );
}

function useParam(param: string) {
    const router = useRouter();
    const value = router.query[param];
    return Array.isArray(value) ? value[0] : value;
}
