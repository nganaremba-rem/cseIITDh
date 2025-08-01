import { useQuery } from "@tanstack/react-query";
import { getNews } from "../api/api";

const formatDate = (dateString) => {
	if (!dateString || dateString.toLowerCase() === "present") return "Present";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

const transformNews = (news) =>
	news
		?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
		.map((item) => ({
			title: item.Title || "",
			date: formatDate(item.date),
			description: item.description || "",
			link: item.link || null,
		})) || [];

export function useNews() {
	return useQuery({
		queryKey: ["news"],
		queryFn: getNews,
		select: transformNews,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
