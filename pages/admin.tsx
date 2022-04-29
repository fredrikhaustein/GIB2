import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";

const CreateRouteMutation = gql`
        mutation (
                $route_name: String!
                $gpx_link: String!
                $mountain_id: Int!
        ) {
                createRoute(
                        route_name: $route_name
                        gpx_link: $gpx_link
                        mountain_id: $mountain_id
                ) {
                        route_name
                        gpx_link
                        mountain_id
                }
        }
`;

const AllMountainsQuery = gql`
        query {
                mountains {
                        ogc_fid
                        navn
                        h_yde
                }
        }
`;

const Admin = () => {
        const [createRoute, { data, loading, error }] =
                useMutation(CreateRouteMutation);
        const {
                register,
                handleSubmit,
                formState: { errors },
        } = useForm();

        // Upload photo function
        const uploadPhoto = async (e) => {
                const file = e.target.files[0];
                const filename = encodeURIComponent(file.name);
                const res = await fetch(`/api/upload-route?file=${filename}`);
                const data = await res.json();
                const formData = new FormData();

                // @ts-ignore
                Object.entries({ ...data.fields, file }).forEach(
                        ([key, value]) => {
                                formData.append(key, value);
                        }
                );

                toast.promise(
                        fetch(data.url, {
                                method: "POST",
                                body: formData,
                        }),
                        {
                                loading: "Uploading...",
                                success: "Route successfully uploaded!🎉",
                                error: `Upload failed 😥 Please try again ${error}`,
                        }
                );
        };

        const onSubmit = async (data) => {
                const { route_name, route } = data;
                const gpx_link = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${route[0].name}`;
                const variables = {
                        route_name,
                        gpx_link,
                };
                console.log(route_name);
                try {
                        toast.promise(createRoute({ variables }), {
                                loading: "Creating new link..",
                                success: "Route successfully created!🎉",
                                error: `Something went wrong 😥 Please try again -  ${error}`,
                        });
                } catch (error) {
                        console.error(error);
                }
        };

        return (
                <div className="container mx-auto max-w-md py-12">
                        <Toaster />
                        <h1 className="text-3xl font-medium my-5">
                                Upload new GPX-file
                        </h1>
                        <form
                                className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg"
                                onSubmit={handleSubmit(onSubmit)}
                        >
                                <label className="block">
                                        <span className="text-gray-700">
                                                Name of Route
                                        </span>
                                        <input
                                                placeholder="Title"
                                                name="route_name"
                                                type="text"
                                                {...register("route_name", {
                                                        required: true,
                                                })}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                </label>
                                <label className="block">
                                        <span className="text-gray-700">
                                                Upload a .gpx(max 1MB).
                                        </span>
                                        <input
                                                {...register("route", {
                                                        required: true,
                                                })}
                                                onChange={uploadPhoto}
                                                type="file"
                                                accept=".gpx"
                                                name="route"
                                        />
                                </label>

                                <button
                                        disabled={loading}
                                        type="submit"
                                        className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
                                >
                                        {loading ? (
                                                <span className="flex items-center justify-center">
                                                        <svg
                                                                className="w-6 h-6 animate-spin mr-1"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                                                        </svg>
                                                        Creating...
                                                </span>
                                        ) : (
                                                <span>Create Route</span>
                                        )}
                                </button>
                        </form>
                </div>
        );
};

export default Admin;
