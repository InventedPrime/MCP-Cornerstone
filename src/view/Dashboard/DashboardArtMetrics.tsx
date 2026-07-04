import { Header } from "../../components/Header";
import { FooterComponent } from "../../components/FooterComponent";
import { Navigate } from "react-router-dom";
import { Panel } from "../../components/Panel";
import { useAuth } from "../../context/AuthContext";
import { getSavedPosts } from "../../utils/firebase";
import { Loader } from "../../components/Loader";
import { useLoader } from "../../context/LoaderContext";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { type Artwork } from "../../utils/MuseumArtworks";

export const DashboardArtMetrics = () => {
  const { user } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const [dataset, setDataset] = useState<
    { department: string; count: number }[]
  >([]);

  useEffect(() => {
    if (!user?.uid) return;
    setIsLoading(true);
    const unsub = getSavedPosts(user.uid, (savedArtworks: Artwork[]) => {
      const counts: Record<string, number> = {};
      savedArtworks.forEach((artwork) => {
        const dept = artwork.department || "Unknown";
        counts[dept] = (counts[dept] || 0) + 1;
      });
      const data = Object.entries(counts)
        .map(([department, count]) => ({ department, count }))
        .sort((a, b) => b.count - a.count);
      setDataset(data);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="page-wrapper">
      <Loader isLoading={isLoading} />
      <Header />
      <div className="dashboard-container">
        <Panel />
        <div className="dashboard-metric-container">
          <div>
            {dataset.length > 0 ? (
              <BarChart
                dataset={dataset}
                yAxis={[
                  {
                    colorMap: {
                      type: "ordinal",
                      colors: [
                        "#e3f2fd",
                        "#bbdefb",
                        "#90caf9",
                        "#64b5f6",
                        "#42a5f5",
                        "#2196f3",
                        "#1e88e5",
                        "#1976d2",
                        "#1565c0",
                        "#0d47a1",
                        "#082f6e",
                        "#051e4a",
                        "#030f2b",
                        "#010812",
                      ],
                    },
                    scaleType: "band",
                    dataKey: "department",
                    tickLabelStyle: {
                      fontSize: 13,
                    },
                    width: 200,
                  },
                ]}
                series={[
                  {
                    dataKey: "count",
                    label: "Favorite Art Department",
                    color: "#0511ba",
                  },
                ]}
                layout="horizontal"
                grid={{ vertical: true }}
                width={1000}
                height={600}
                sx={{
                  "& .MuiChartsAxis-tickLabel": {
                    fontWeight: "bold !important",
                  },
                }}
              />
            ) : (
              <div className="no-liked-pictures-container">
                <p>No Saved Artworks.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};
