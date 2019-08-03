from django.conf.urls import url
from django.conf import settings

from webgis.viewer.views import web_client, map, api


urlpatterns = [
    url(r"^$", web_client.map, name="map"),
    url(r"^vue/$", web_client.vue_map, name="vuemap"),
    url(r"^login/$", web_client.client_login, name="login"),
    url(r"^logout/$", web_client.client_logout, name="logout"),

    url(r"^ows/$", map.ows, name="ows"),
    url(r"^tile/(?P<project_hash>[^/]+)/(?P<publish>\d+)/tile/(?P<layers_hash>[^/]+)/(?P<z>\d+)/(?P<x>\d+)/(?P<y>\d+)\.(?P<format>\w+)$", map.tile, name="tile"),
    url(r"^legend/(?P<project_hash>[^/]+)/(?P<publish>\d+)/legend/(?P<layer_hash>[^/]+)/(?P<zoom>\d+)\.(?P<format>\w+)$", map.legend, name="legend"),
    url(r"^vector/$", map.vector_layers, name="vectorlayers"),
    url(r"^filter/$", map.filterdata, name="filter"),

    url(r"^project.json$", api.project_json, name="project_json"),
    url(r"^projects.json$", api.projects_json, name="projects_json"),
    url(r"^user.json$", api.user_json, name="user_json"),
#    url(r'^(?P<project_name>\w+)/$',
#        web_client.MapRedirectView.as_view(), name='map_shortcut'),
]

if settings.DEBUG:
    urlpatterns += [
        url(r'^dev/vue/$', web_client.dev_vue_map)
    ]
