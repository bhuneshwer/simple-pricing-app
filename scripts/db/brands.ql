db.brands.update({ _id: ObjectId("5e3719ebc3201ed2b54d7911") }, { $set: { "name": "honeywell","url":"https://www.industrybuying.com/brands/honeywell/safety-1224/respiratory-protection-5328/?True","website_id": ObjectId("5e3718a6c3201ed2b54d7910") } }, { upsert: true })

db.brands.update({ _id: ObjectId("5e371a61c3201ed2b54d7912") }, { $set: { "name": "flamingo", "url":"https://www.industrybuying.com/brands/flamingo/medical-supplies-equipment-4913/support-braces-splints-4975/?True","website_id": ObjectId("5e3718a6c3201ed2b54d7910") } }, { upsert: true })

db.brands.update({ _id: ObjectId("5e3721fbc3201ed2b54d7913") }, { $set: { "name": "vimox", "url":"https://www.industrybuying.com/brands/vimox/solar-4050/solar-fencing-6018/?True","website_id": ObjectId("5e3718a6c3201ed2b54d7910") } }, { upsert: true })