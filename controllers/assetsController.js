import asyncHandler from 'express-async-handler';
import Asset from '../models/assetModel.js';
import User from '../models/userModel.js';


export const getAsset = asyncHandler(async (req, res) => {
    const { assetId } = req.body;
    let asset;

    if (assetId) {
        asset = await Asset.find({ _id: assetId, userId: req.user.id });
    }
    if (asset.length > 0) {
        res.status(200).json(asset);
    } else {
        res.status(404).json({ message: 'No assets found' });
    }
});


export const createAsset = asyncHandler(async (req, res) => {
    const {
        assetType,
        bankName,
        provider,
        companyName,
        propertyAddress,
        otherAssetDetails
    } = req.body;

    if (!assetType) {
        res.status(400);
        throw new Error('Please select an asset type');
    }

    const assetData = {
        assetType,
        userId: req.user.id
    };

    if (assetType.toLowerCase() === 'bank account' && bankName) {
        assetData.bankName = bankName;
    } else if ((assetType.toLowerCase() === 'life insurance' || assetType.toLowerCase() === 'pension') && provider) {
        assetData.provider = provider;
    } else if (assetType.toLowerCase() === 'stocks and shares' && companyName) {
        assetData.companyName = companyName;
    } else if (assetType.toLowerCase() === 'property' && propertyAddress) {
        assetData.propertyAddress = propertyAddress;
    } else if (assetType.toLowerCase() === 'other' && otherAssetDetails) {
        assetData.otherAssetDetails = otherAssetDetails;
    }
    
    const asset = await Asset.create(assetData);

    res.status(200).json(asset);
});


export const updateAsset = asyncHandler(async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if (!asset) {
            res.status(404);
            throw new Error('Asset not found.');
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(403);
            throw new Error('No such asset found');
        }

        if (asset.userId.toString() !== user.id) {
            res.status(403);
            throw new Error('User is not authorised to update');
        }

        Object.assign(asset, req.body);
        await asset.validate();
        await asset.save();

        res.status(200).json(asset);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


export const deleteAsset = asyncHandler(async (req, res) => {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
        res.status(400);
        throw new Error('Asset not found.');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(403);
        throw new Error('No such asset found');
    }

    if (asset.userId.toString() !== user.id) {
        res.status(403);
        throw new Error('User is not authorised to delete');
    }

    await Asset.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
});
