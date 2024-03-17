export default function Page({ params }: { params: { comic_id: string } }) {
  return <>{params.comic_id}</>
}
