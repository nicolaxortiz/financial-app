import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme.js";
import Home from "./pages/Home.jsx";
import Financial from "./pages/Financial.jsx";
import Login from "./pages/Login.jsx";
import { UseContext } from "./hooks/useContext.js";
import useDataStates from "./hooks/useDataStates.jsx";

export default function App() {
	const initial = useDataStates();
	return (
		<BrowserRouter>
			<UseContext.Provider value={initial}>
				<ThemeProvider theme={theme}>
					<Routes>
						<Route index element={<Home />} />
						<Route path="/login" element={<Login type="login" />} />
						<Route path="/register" element={<Login type="register" />} />
						<Route
							path="/forgot-password"
							element={<Login type="password" />}
						/>
						<Route path="/financial" element={<Financial />} />
					</Routes>
				</ThemeProvider>
			</UseContext.Provider>
		</BrowserRouter>
	);
}
