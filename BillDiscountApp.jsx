import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Card,
  Button,
  Badge,
  FormText,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
const coupons = [
  {
    name: 'FLAT25USD',
    minAmount: 1,
    discountType: 'flat',
    discount: 25,
    maxDiscount: 25,
  },
  {
    name: '20Max2000',
    minAmount: 1,
    discountType: 'percentage',
    discount: 20,
    maxDiscount: 2000,
  },
  {
    name: '10OF1000',
    minAmount: 1000,
    discountType: 'percentage',
    discount: 10,
    maxDiscount: Infinity,
  },
];
const applyDiscount = (coupon, bill) => {
  let discountAmount = 0;
  if (bill < coupon.minAmount) {
    return {
      final: +bill,
      discountAmount,
    };
  }
  if (coupon.discountType === 'percentage') {
    discountAmount = (coupon.discount * +bill) / 100;
  } else {
    discountAmount = coupon.discount;
  }
  if (discountAmount > coupon.maxDiscount) {
    discountAmount = coupon.maxDiscount;
  }
  return {
    final: bill - discountAmount > 0 ? bill - discountAmount : 0,
    discountAmount,
  };
};

export default function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmonut, setFinalAmount] = useState(0);
  const [coupon, setCoupon] = useState(undefined);

  const handleDiscount = (coupon) => {
    const result = applyDiscount(coupon, billAmount);
    setCoupon(coupon);
    setDiscountAmount(result.discountAmount);
    setFinalAmount(result.final);
  };
  return (
    <div
      className="mx-auto border border-dark mt-4 rounded"
      style={{ width: '300px' }}
    >
      <div className="p-4">
        <FormLabel className="text-success">Enter Your Bill Amount</FormLabel>
        <FormControl
          type="number"
          min="0"
          onChange={(e) => {
            setBillAmount(+e.target.value);
          }}
        ></FormControl>
      </div>
      <div className="mx-auto p-4 mt-2 border-top border-bottom">
        <FormLabel>
          <Badge pill bg="secondary" className="p-2">
            {coupon ? coupon?.name : 'Select Coupon'} !
          </Badge>
        </FormLabel>
        <div className="d-flex flex-wrap">
          {coupons.map((c) => {
            return (
              <Button
                key={c.name}
                // disabled={c?.name === coupon?.name}
                className="me-2 mt-2"
                variant="outline-info"
                onClick={() => {
                  handleDiscount(c);
                }}
              >
                {c?.name}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="mx-auto p-4 mt-2">
        {discountAmount && coupon ? (
          <FormText color="secondary">You saved {discountAmount} !</FormText>
        ) : null}
        <br />
        <FormLabel className="text-success">
          Your Final Bill : {finalAmonut}
        </FormLabel>
      </div>
    </div>
  );
}
