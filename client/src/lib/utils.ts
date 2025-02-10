export const dataGridClassNames =
  "border border-gray-200 bg-white dark:border-dark-secondary dark:bg-dark-secondary dark:text-white";

  export const dataGridSxStyles = (isDarkMode: boolean) => {
    return {
      "& .MuiDataGrid-columnHeaders": {
        color: `${isDarkMode ? "#e5e7eb" : ""}`,
        '& [role="row"] > *': {
          backgroundColor: `${isDarkMode ? "#1d1f21" : "#ffffff"}`,
          borderColor: `${isDarkMode ? "#2d3135" : ""}`,
        },
      },
      "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: "bold !important", // Ensure font weight is applied to column header title
      },
      "& .MuiIconbutton-root": {
        color: `${isDarkMode ? "#a3a3a3" : ""}`,
      },
      "& .MuiTablePagination-root": {
        color: `${isDarkMode ? "#a3a3a3" : ""}`,
      },
      "& .MuiTablePagination-selectIcon": {
        color: `${isDarkMode ? "#a3a3a3" : ""}`,
      },
      "& .MuiDataGrid-cell": {
        border: "none",
      },
      "& .MuiDataGrid-row": {
        borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
      },
      "& .MuiDataGrid-withBorderColor": {
        borderColor: `${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
      },
    };
  };