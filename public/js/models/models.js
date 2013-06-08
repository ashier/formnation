window.UserModel = Backbone.Model.extend({

    urlRoot: "/api/users/",
    idAttribute: "_id",

    defaults: 
    {
        __v: 2,
        _id: "51b2d6c49a58a936c8000001",
        email: "ashier@gmail.com",
        first_name: "ashier",
        last_name: "de leon",
        middle_name: "relucio",
        password: "admin",
        slug: "ashier-de-leon",
        profiles: "",
        forms: [
            {
                __v: 0,
                _id: "51b31555aced300000000001",
                height: "792",
                slug: "sss-e1-93894520914",
                type: "SSS-E1",
                width: "612",
                pages: "",
                id: "51b31555aced300000000001"
            }
        ],
        full_name: "ashier de leon",
        id: "51b2d6c49a58a936c8000001"
    }
});

window.FormModel = Backbone.Model.extend({

    urlRoot: "/api/form/",

    idAttribute: "_id",

    defaults: {
        __v: 0,
        _id: "51b3074bf9cd6206fb000001",
        height: "792",
        slug: "sss-e1-61184785724",
        type: "SSS-E1",
        width: "612",
        pages: [
            {
                _id: "51b2fa0af2a1bbd7ec000001",
                index: "0",
                page_image: "/public/forms/sss_e1_0.png",
                slug: "publicformssss_e1_0png",
                id: "51b2fa0af2a1bbd7ec000001"
            },
            {
                _id: "51b2fa1ef2a1bbd7ec000002",
                index: "1",
                page_image: "/public/forms/sss_e1_1.png",
                slug: "publicformssss_e1_1png",
                id: "51b2fa1ef2a1bbd7ec000002"
            }
        ],
        id: "51b3074bf9cd6206fb000001"
    }

    
});

window.FormCollection = Backbone.Collection.extend({
    model: FormModel,
    url: "/api/form/"
});


window.PageModel = Backbone.Model.extend({

    urlRoot: "/api/page/",
    idAttribute: "_id",

    defaults: 
        {
            __v: 0,
            _id: "51b2fa0af2a1bbd7ec000001",
            page_image: "/public/forms/sss_e1_0.png",
            slug: "publicformssss_e1_0png",
            fields: [ ],
            id: "51b2fa0af2a1bbd7ec000001"
        }
});

window.FieldModel = Backbone.Model.extend({

    urlRoot: "/api/field/",
    idAttribute: "_id",

    defaults: 
        {
            __v: 0,
            _id: "51b2fa0af2a1bbd7ec000001",
            page_image: "/public/forms/sss_e1_0.png",
            slug: "publicformssss_e1_0png",
            fields: [ ],
            id: "51b2fa0af2a1bbd7ec000001"
        }
});