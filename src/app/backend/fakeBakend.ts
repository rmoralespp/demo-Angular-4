import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendProvider(backend: MockBackend, options: BaseRequestOptions) {
      
        // array in local storage for registered users
        let posts: any[] = JSON.parse(localStorage.getItem('posts')) || [];
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
               


                // get posts
                if (connection.request.url.endsWith('/api/posts') && connection.request.method === RequestMethod.Get) {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: posts })));     
                }

                // get post by id
                if (connection.request.url.match(/\/api\/posts\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                        // find post by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedPosts = posts.filter(post => { return post.id === id; });
                        let post = matchedPosts.length ? matchedPosts[0] : null;

                        // respond 200 OK with post
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: post })));
                   
                }

                // create post
                if (connection.request.url.endsWith('/api/posts/') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newPost = JSON.parse(connection.request.getBody());
 
                    newPost.id = posts.length + 1;
                    posts.push(newPost);
                    localStorage.setItem('posts', JSON.stringify(posts));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: newPost })));
                }

                // delete post
                if (connection.request.url.match(/\/api\/posts\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < posts.length; i++) {
                            let post = posts[i];
                            if (post.id === id) {
                                // delete post
                                posts.splice(i, 1);
                                localStorage.setItem('posts', JSON.stringify(posts));
                                break;
                            }
                        }
                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));           
                }

                // edit post
                if (connection.request.url.match(/\/api\/posts\/\d+$/) && connection.request.method === RequestMethod.Put) {
                
                        let editPost:any = JSON.parse(connection.request.getBody());
                        let indice=-1
                        posts.forEach((item, index) =>{
                            if (item.id == editPost.id){
                                indice=index;
                            }
                        })
                        if (indice == -1) {
                            return connection.mockError(new Error('Post "' + editPost.id + '" no existe'));
                        }
                        else{
                            posts[indice] = editPost;
                            localStorage.setItem('posts', JSON.stringify(posts));
                            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body:editPost }))); 
                        }
                }



            }, 500);

        });

    return new Http(backend, options);
   
};