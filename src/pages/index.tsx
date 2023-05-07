import { PageContainer } from "~/components/PageContainer";

export default function Home() {
    return (
        <PageContainer>
            <div className="flex h-96 flex-col items-center">
                <input
                    type="password"
                    className="my-1 h-6 w-56 rounded-md border-2 border-white bg-white p-1"
                />
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
