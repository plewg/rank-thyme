import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import { PageContainer } from "~/components/PageContainer";
import { createPollSchema } from "~/schemas/poll";
import { api } from "~/utils/api";

type PollValidationSchema = z.infer<typeof createPollSchema>;

export default function Home() {
    const router = useRouter();
    const [newOption, setNewOption] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<PollValidationSchema>({
        resolver: zodResolver(createPollSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });

    const { mutate } = api.poll.create.useMutation({
        onSuccess: (data) => {
            void router.push(`/poll/vote/${data.id}`);
        },
    });

    return (
        <PageContainer>
            <form
                id="addOptionForm"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (newOption.length > 0) {
                        const optToSet = newOption.trim();
                        const exists = fields
                            .map(({ value }) => value)
                            .includes(optToSet);

                        if (!exists) {
                            append({ value: optToSet });
                        }
                    } else {
                        void handleSubmit((data) => mutate(data))();
                    }
                    setNewOption("");
                }}
            />

            <form
                onSubmit={(e) => void handleSubmit((data) => mutate(data))(e)}
            >
                <div className="flex h-full w-56 flex-col items-center gap-3">
                    <button
                        type="submit"
                        className="h-9 w-full rounded-md border-2 border-white bg-blue-300 italic text-white focus:border-blue-500"
                    >
                        Create
                    </button>
                    <label className="flex w-full flex-col">
                        Poll Name:
                        <input
                            type="text"
                            className={`my-1 h-8 w-full rounded-md border-2 border-blue-300 bg-white p-1 ${
                                errors.name ? "border-red-500" : ""
                            }`}
                            id="name"
                            {...register("name")}
                        />
                        {errors.name?.message !== undefined && (
                            <ErrorMessage message={errors.name.message} />
                        )}
                    </label>
                    {/* <label className="flex w-full flex-col">
                        Password:
                        <input
                            type="password"
                            className={`my-1 h-8 w-full rounded-md border-2 border-blue-300 bg-white p-1 ${
                                errors.password ? "border-red-500" : ""
                            }`}
                            id="password"
                            {...register("password")}
                        />
                        {errors.password?.message !== undefined && (
                            <ErrorMessage message={errors.password.message} />
                        )}
                    </label> */}
                    <label className="flex flex-grow flex-col">
                        Add option:
                        <div className="flex flex-row items-center">
                            <input
                                form="addOptionForm"
                                onChange={(e) =>
                                    setNewOption(e.currentTarget.value)
                                }
                                type="text"
                                value={newOption}
                                className={`my-1 h-8 w-full rounded-md border-2 border-blue-300 bg-white p-1 ${
                                    errors.options ? "border-red-500" : ""
                                }`}
                            />
                            <button
                                form="addOptionForm"
                                type="submit"
                                className="h-8 w-8 rounded-md border-2 border-white bg-blue-300 italic text-white focus:border-blue-500"
                            >
                                +
                            </button>
                        </div>
                        {errors.options?.message !== undefined && (
                            <ErrorMessage message={errors.options.message} />
                        )}
                    </label>

                    <div className="flex w-full flex-col gap-1">
                        {fields.map((field, index) => (
                            <Fragment key={field.id}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        remove(index);
                                    }}
                                    className="h-9 w-full rounded-md border-2 border-slate-400 bg-amber-50 italic focus:border-blue-500"
                                >
                                    {field.value}
                                </button>
                                <input
                                    type="text"
                                    readOnly
                                    value={field.value}
                                    hidden
                                    {...register(`options.${index}.value`)}
                                />
                            </Fragment>
                        ))}
                    </div>

                    {fields.length > 0 && (
                        <span>(click an option to remove)</span>
                    )}
                </div>
            </form>
        </PageContainer>
    );
}

function ErrorMessage({ message }: { message: string }) {
    return <span className="italic text-red-500">{message}</span>;
}
