export function GET({ redirect }: { redirect: (path: string, status?: number) => Response }) {
	return redirect("/fa/rss.xml", 302);
}
