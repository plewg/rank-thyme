import { useRouter } from "next/router";
import { PageContainer } from "~/components/PageContainer";
import { api } from "~/utils/api";

export default function ResultsPage() {
    const id = useParam("id");

    if (!id) {
        return <LoadingSpinner />;
    }

    return <View id={id} />;
}

function View({ id }: { id: string }) {
    const { data, isLoading } = api.poll.results.useQuery({ id });

    if (isLoading || !data) {
        return <LoadingSpinner />;
    }

    const sortedResults = [...data.votes].sort((a, b) => {
        if (a.weightedVote === b.weightedVote) {
            return 0;
        }

        if (a.weightedVote === null) {
            return 1;
        }

        if (b.weightedVote === null) {
            return -1;
        }

        return a.weightedVote - b.weightedVote;
    });

    return (
        <PageContainer>
            <div className="flex h-full w-56 flex-col items-center gap-3">
                <div>{data.name}</div>
                {sortedResults.map((option, i) => (
                    <div
                        key={option.id}
                        className="flex h-9 w-full flex-row items-center justify-center rounded-md border-2 border-slate-400 bg-amber-50 align-middle"
                    >
                        <span className="ml-1 flex-1">{i + 1}.</span>
                        <span>
                            {option.body} ({option.weightedVote})
                        </span>
                        <div className="flex-1" />
                    </div>
                ))}
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
