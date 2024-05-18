import { Metadata } from "next";
import Form from "./form";

export const metadata: Metadata = {
    title: "Buat akun - Properti",
};

export default function Page() {
    return (
        <div className="grid justify-items-center p-4">
            <Form />    
        </div>
    )
}