/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import InputBase from "./InputBase";

const ValueForm = ({ data, onPurchase }) => {
	const { name, rate } = data;
	const INIT = { amount: 0, converted: 0 };
	const [exchange, setExchange] = useState(INIT);
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		setExchange({
			...exchange,
			converted: Number(exchange.amount / rate).toFixed(6),
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name]);

	useEffect(() => {
		onPurchase(transactions);
	}, [transactions]);

	const generateID = (prefix) =>
		Math.random()
			.toString(36)
			.replace("0.", prefix || "");

	const handleChange = ({ target: { value, name } }) => {
		const val = Number(value.trim());
		const converted = (val / rate).toFixed(6);

		setExchange({
			[name]: val,
			converted,
		});
	};

	const makePurchase = useCallback(
		(e) => {
			e.preventDefault();
			if (!exchange.amount) {
				alert("I'm Afraid I Cant Let You Do That, Please Enter An Amount");
			}

			const payload = {
				...exchange,
				name,
				id: generateID("transX-id_"),
			};

			setTransactions([...transactions, payload]);
		},
		[exchange, transactions]
	);

	// console.log("transX", transactions);

	return (
		<form onSubmit={makePurchase} className='form'>
			<div className='input-group mb-3'>
				<InputBase name='amount' textLabel='USD' onChange={handleChange} />
				<i className='fas fa-exchange-alt' />
				<InputBase value={exchange.converted} disabled textLabel={name} />
			</div>
			<input className='btn btn-primary' type='submit' value='Purchase' />
		</form>
	);
};

export default ValueForm;
