'use strict';

App.factory('PageModel',
    ['BaseModel', '$http', '$q', 'uuid',
        function(BaseModel, $http, $q, uuid) {

            var PageModel = BaseModel.extends({
                constructor: function(data) {
                    BaseModel.call(this, data);
                    this.url = {
                        'get': 'nami_api_get_page',
                        'post': 'nami_api_post_pages',
                        'put': 'nami_api_put_page',
                        'delete': 'nami_api_delete_page',
                        'upload': 'nami_api_post_pages_upload',
                        'uploadFolder': {
                            'block': 'nami_api_post_blocks_upload'
                        }
                    };
                },

                getDefaultProperties: function() {
                    return {
                        'id': null,
                        'active': false,
                        'title': '',
                        'slug': '',
                        'header': '',
                        'content': '',
                        'metaDescription': null,
                        'metaKeywords': true,
                        'category': null,
                        'background': null,
                        'createdBy': null,
                        'negativeText': false,
                        'template': 'default',
                        'blocks': [],
                        '_references': {
                            'category': null,
                            'background': null,
                            'createdBy': null
                        }
                    };
                },

                setData: function (data) {
                    BaseModel.prototype.setData.call(this, data);
                    angular.forEach(this.data.blocks, function(block) {
                      block.uuid = uuid.new();
                    });
                },

                getTitle: function() {
                    return this.data.title;
                },

                getSlug: function() {
                    return this.data.slug;
                },

                getHeader: function() {
                    return this.data.header;
                },

                getContent: function() {
                    return this.data.content;
                },

                getMetaDescription: function() {
                    return this.data.metaDescription;
                },

                getMetaKeywords: function() {
                    return this.data.metaKeywords;
                },

                isActive: function() {
                    return this.data.active;
                },

                getCategory: function() {
                    return this.getReferences('category');
                },

                getBackground: function() {
                    return this.getReferences('background');
                },

                getBackgroundUrl: function() {
                    var url;
                    if (this.getBackground()) {
                        url = this.getBackground().url;
                    }
                    return url;
                },

                setUpload: function(image, folder, params) {
                    if (angular.isObject(image)) {
                        if (!folder) {
                            this.data.background = image.id;
                            this.data._references.background = image;
                        } else if (params && params.id) {
                            this.getBlock(params.id).images.push(image.id);
                            this.getBlock(params.id)
                                ._references.images[image.id] = image;
                        }
                    }
                    return this;
                },

                removeUpload: function(uploadId, params) {
                    if (uploadId && angular.isObject(params) && params.id) {
                        var uploadIndex = this.getBlock(params.id)
                            .images.indexOf(uploadId);
                        this.getBlock(params.id)
                            .images.splice(uploadIndex, 1);
                        delete this.getBlock(params.id)
                            ._references.images[uploadId];
                    }
                },

                getBlock: function(id, byUuid) {
                    var block;
                    if (!angular.isDefined(byUuid)) {
                      var byUuid = false;
                    }
                    for (var i = 0, j = this.data.blocks.length; i < j; i++) {
                        if ((!byUuid && this.data.blocks[i].id === parseInt(id))
                        ||   (byUuid && this.data.blocks[i].uuid === id)) {
                            block = this.data.blocks[i];
                            break;
                        }
                    }
                    return block;
                },

                getBlocks: function() {
                    return this.data.blocks;
                },

                addBlock: function(block) {
                    if (angular.isObject(block)) {
                      block.uuid = uuid.new();
                      this.data.blocks.push(block);
                    }
                    return this;
                },

                addEmptyBlock: function() {
                    var positionMax = 1;
                    angular.forEach(this.data.blocks, function(block) {
                      if (block.position > positionMax) {
                        positionMax = block.position;
                      }
                    });
                    return this.addBlock({
                      id: null,
                      active: true,
                      position: positionMax + 1,
                      title: 'Block',
                      content: '<p>Contenu</p>',
                      type: 'default',
                      template: 'default',
                      page: this.getId()
                    });
                },

                removeBlock: function(block) {
                    if (angular.isObject(block)) {
                        if (block.id === blockCursor.id) {
                            delete this.data.blocks[index];
                        }
                    } else if (angular.isString(block)) {
                        angular.forEach(this.data.blocks, function (blockCursor, index) {
                            if (block === blockCursor.id) {
                                delete this.data.blocks[index];
                            }
                        });
                    }
                    this.data.blocks.push(block);
                    return this;
                },

                getCreatedBy: function() {
                    return this.getReferences('createdBy');
                }

            });
            return PageModel;
        }]);