import ReturnDetailsComponent from "@/app/features/profile/components/ReturnDetailsComponent";

export default async function ReturnDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <ReturnDetailsComponent returnId={resolvedParams.id} />;
}
