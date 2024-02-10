import Grid from "@/components/grid";

export default function Loading() {
  return (
    <Grid>
      {Array(12)
        .fill(0)
        .map((_, i) => {
          return <Grid.Item key={i} />;
        })}
    </Grid>
  );
}
