import React, { useState } from "react";
import CryptoTile from "./CryptoTile";
import ValueForm from "./ValueForm";
import Transactions from "./Transactions";

import btc from "../assets/btc.png";
import eth from "../assets/eth.png";
import ada from "../assets/ada.png";

const Home = () => {
	const tiles = [
		{ id: 1, icon: btc, name: "BTC", rate: 47000 },
		{ id: 2, icon: eth, name: "ETH", rate: 3100 },
		{ id: 3, icon: ada, name: "ADA", rate: 2.5 },
	];

	const [selectedTile, setSelectedState] = useState(tiles[0]);
	const [list, setList] = useState([]);

	const handleSelect = (data) => {
		setSelectedState(data);
	};

	const buildList = (list) => {
		setList(list);
	};

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-6'>
					<div className='d-flex'>
						{tiles.map((coin) => (
							<CryptoTile
								key={coin.id}
								data={coin}
								onClick={handleSelect}
								selected={coin.id === selectedTile.id}
							/>
						))}
					</div>
					<ValueForm data={selectedTile} onPurchase={buildList} />
				</div>
				<div className='col-6'>
					<Transactions list={list} />
				</div>
			</div>
		</div>
	);
};

export default Home;
