import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "404 - Properti",
};

export default function Page() {
  notFound()
}
