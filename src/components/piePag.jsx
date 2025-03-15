import React from "react";

function PiePag() {
    return (
        <footer class="bg-white rounded-lg m-2 shadow-[0px_0px_10px_3px_rgba(0,0,0,0.15)]">
            <div class="w-full mx-auto p-4 md:flex md:items-center md:justify-between">
                <span class="text-sm text-orange-500 sm:text-center ">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
                </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium  text-orange-500 sm:mt-0">
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default PiePag;