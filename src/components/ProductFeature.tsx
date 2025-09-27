"use client";

import React from "react";

interface ProductFeaturesProps {
    features: string;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
    return (
        <div
            className=""
            dangerouslySetInnerHTML={{ __html: features }}
        />
    );
};

export default ProductFeatures;
